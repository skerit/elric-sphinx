#!/usr/bin/env python
import gtk
import gobject
import pygst
pygst.require('0.10')
gobject.threads_init()
import gst
from subprocess import Popen
import os
import sys
import getopt

# Get the language model to use
try:
  model_name = sys.argv[1]
except IndexError:
  model_name = 'default'

# Get the device name to listen to
try:
	device_name = sys.argv[2]
except IndexError:
  device_name = 'default'

current_dir = os.path.dirname(os.path.abspath(__file__))

config = {
	'hmm': '/usr/share/pocketsphinx/model/hmm/wsj1',
	'lm': current_dir + '/models/%s/language_model' % model_name,
	'dict': current_dir + '/models/%s/dictionary' % model_name
}
	
class Voximp(object):

    def __init__(self):
      self.init_gst()
      self.pipeline.set_state(gst.STATE_PLAYING)

    def init_gst(self):
        self.pipeline = gst.parse_launch('alsasrc device=' + device_name + ' '
                                         + '! audioconvert ! audioresample '
                                         + '! vader name=vad auto-threshold=true '
                                         + '! pocketsphinx name=asr ! fakesink')
        asr = self.pipeline.get_by_name('asr')
        asr.connect('partial_result', self.asr_partial_result)
        asr.connect('result', self.asr_result)
        asr.set_property('lm', config['lm'])
        asr.set_property('dict', config['dict'])
        asr.set_property('configured', True)

        bus = self.pipeline.get_bus()
        bus.add_signal_watch()
        bus.connect('message::application', self.application_message)

        self.pipeline.set_state(gst.STATE_PAUSED)

    def asr_partial_result(self, asr, text, uttid):
        struct = gst.Structure('partial_result')
        struct.set_value('hyp', text)
        struct.set_value('uttid', uttid)
        asr.post_message(gst.message_new_application(asr, struct))

    def asr_result(self, asr, text, uttid):
        struct = gst.Structure('result')
        struct.set_value('hyp', text)
        struct.set_value('uttid', uttid)
        asr.post_message(gst.message_new_application(asr, struct))

    def application_message(self, bus, msg):
        msgtype = msg.structure.get_name()
        
        if msgtype == 'result':
            self.final_result(msg.structure['hyp'], msg.structure['uttid'])

    def final_result(self, hyp, uttid):
      # Only print the result if it actually found something
      if hyp:
        result = '{"final_result": "' + hyp + '", "uttid": "' + uttid + '", "probability": 0}'
        print result


app = Voximp()
gtk.main()
