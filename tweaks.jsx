// tweaks.jsx — MO§ES™ deck tweak controls
// Palette / accent / density wired to data-attributes on <deck-stage>.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "bone",
  "density": "normal",
  "accent": "#a87c1e",
  "signalGlyph": true
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const stage = document.querySelector('deck-stage');
  if (!stage) return;
  stage.setAttribute('data-palette', t.palette);
  stage.setAttribute('data-density', t.density);
  // Override the --signal CSS variable
  stage.style.setProperty('--signal', t.accent);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette" />
      <TweakRadio
        label="Paper"
        value={t.palette}
        options={['bone', 'cool', 'ink']}
        onChange={(v) => setTweak('palette', v)}
      />

      <TweakSection label="Accent" />
      <TweakColor
        label="Signal color"
        value={t.accent}
        options={['#a87c1e', '#b8421f', '#18140e', '#1f5fa8', '#3d6b3d']}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakSection label="Density" />
      <TweakRadio
        label="Spacing"
        value={t.density}
        options={['compact', 'normal', 'loose']}
        onChange={(v) => setTweak('density', v)}
      />
    </TweaksPanel>
  );
}

// Mount
const __mount = document.createElement('div');
document.body.appendChild(__mount);
ReactDOM.createRoot(__mount).render(<App />);

// Apply defaults on first paint (in case panel is closed)
applyTweaks(TWEAK_DEFAULTS);
