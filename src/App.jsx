import "./App.css";

function App() {
  return (
    <div className="interior-page">
      <div className="room-scene">
        <div className="wall" />

        <div className="frame frame-one" />
        <div className="frame frame-two" />
        <div className="frame frame-three" />
        <div className="frame frame-four" />
        <div className="frame frame-five" />
        <div className="frame frame-six" />

        <div className="horn" aria-label="decorative antler" />
        <div className="round-art art-left" />
        <div className="round-art art-right" />

        <div className="window-frame">
          <div className="window-pane left" />
          <div className="window-pane right" />
          <div className="window-sill" />
        </div>

        <div className="clock" aria-label="Wall clock">
          <span className="hand hour" />
          <span className="hand minute" />
          <span className="center-dot" />
          <span className="num n1">XII</span>
          <span className="num n2">I</span>
          <span className="num n3">II</span>
          <span className="num n4">III</span>
          <span className="num n5">IV</span>
          <span className="num n6">V</span>
          <span className="num n7">VI</span>
          <span className="num n8">VII</span>
          <span className="num n9">VIII</span>
          <span className="num n10">IX</span>
          <span className="num n11">X</span>
          <span className="num n12">XI</span>
        </div>

        <div className="sofa-group">
          <div className="sofa">
            <div className="sofa-back" />
            <div className="sofa-seat" />
            <div className="sofa-arm left" />
            <div className="sofa-arm right" />
            <div className="cushion c1" />
            <div className="cushion c2" />
            <div className="cushion c3" />
            <div className="cushion c4" />
          </div>

          <div className="throw" />
        </div>

        <div className="ottoman" />
        <div className="table-group">
          <div className="table-base" />
          <div className="table-top" />
        </div>

        <div className="plant-stand" />
        <div className="plant-pot">
          <div className="leaf leaf-1" />
          <div className="leaf leaf-2" />
          <div className="leaf leaf-3" />
          <div className="leaf leaf-4" />
        </div>

        <div className="rug" />
        <div className="badge">Made with care, chosen to stay.</div>
      </div>
    </div>
  );
}

export default App;
