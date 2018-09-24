## Basic Subtractive Synthesizer in Audulus

Tutorial by James William Dunn.

Together, let's build a simple subtractive synthesizer from first principles. 

Ultimately, the synthesizer will have two "voices" and a filter cutoff which can be modulated by a low-frequency oscillator for a deeper "feel". A standard ADSR envelope (triggered by the input gate) will modulate the output amplitude. If any of this is foreign, take a look at this introduction to audio synthesis: https://en.wikipedia.org/wiki/Synthesizer#Components


### Step 1

First, we create a patch node. That's all. The patch node is a container in which we can pack several components and expose a few simple controls on the outside. Think of a mobile phone: there may be many complex circuits inside, but only a few simple controls are seen on the outside.

### Step 2

Open the patch to look inside. A patch can be opened by double-clicking it or tap and open. http://docs.audulus.com/nodes/#patch We'll begin by adding a few neccessary components and build up from there. Two inputs are required: one to control the frequency and another to trigger a note. You can rename these. Then, we need an oscillator for the fundamental voice of the synthesizer. Be sure to "expose" this node so that we can see it on the patch interface and therefore change the wave shape. We'll also need a knob to adjust the volume. Finally, we'll need an output to route our sound to a speaker.

### Step 3

When you exit from the interior of the patch, you should see a pile of components on its interface. These are the exposed elements. We can arrange these into a more suitable layout. After you've arranged them, you can "lock" the interface so they can't be moved any more. You can always unlock again to rearrange items.

### Step 4

At this point, you can attach either a MIDI keyboard component (if your keyboard is attached and set up) or a trigger and a value. Although basic, you can create tones. Notice how they are unfiltered and either "on" or "off" without modulation.

### Step 5

Open the patch and add a filter, and two knobs. Set the cutoff min 20 and max 20000. Exit the patch and arrange the UI. Adjust the cutoff and resonance and listen for the changes from the prior step.

### Step 6

Add a amplitude envelope (ADSR node) and another level node. Move the gate to trigger this new ADSR. Set the amp of the oscillator at 1. Adjust the A value to 0 and the R value to 1. You should now hear a slight change in the amplitude over time and a longer release.

### Step 7

We will not expose the ADSR. Instead we'll add controlling knobs for the filter. Arrange the UI. Now adjust the A knob and listen for a slower attack.

### Step 8

Add another oscillator, a mixer, and a detuning knob. The expression adjusts the incoming frequency up/down one octave. Adjust the amps to 50% of their volume for now. Try detuning the second oscillator to add a little texture. A value of `-0.02` gives a nice rolling wave effect. As another test, adjust it both up and down almost an octave.

### Step 9

Add level controls to each oscillator. Adjust these for primary and secondary emphasis.

### Step 10

Here, we construct an LFO to modulate the filter cutoff. The wave form is triangular (sourced from a phasor node) with a range of .01 to 100Hz. We also add a knob to control the amount of modulation. 

Because the output of the wave can range (at maximum) from -1 to 1, we want to convert this to a Hz value which we'll use to control (or wiggle) the cutoff input on the filter. Let's make `-1` mean "down three octaves" and `1` mean "up three octaves".

To make this happen, we add an octave-to-Hertz node (Modules->Utilities->Translation->o2Hz) utility translation  and modify it to have a customizable reference frequency (the Cutoff knob). We multiply the inbound value `o` by 3, for the octave range up and down.

### Step 11

Attach MIDI and set to polyphonic. Tweak the knobs to explore the vast range of sound options you now have, and rock on!

Note, knobs can be assigned a MIDI CC