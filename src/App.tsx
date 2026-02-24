import './App.css'
import {useState} from "react";

function App() {

    const [numAds, setNumAds] = useState(0)
    const [numFacts, setNumFacts] = useState(0)

    function incNumAds() {
        setNumAds(numAds + 1)
    }

    function incNumFacts() {
        setNumFacts(numFacts + 1)
    }

    return (
        <>
            <div>
                ClarifAI
            </div>
            <div className={"grid grid-flow-col grid-rows-3 gap-1"}>
                <div className={""}>
                    Fact Checking
                    <p>Identify and correct Misinformation</p>
                </div>
                <div className={""}>
                    Ad Blocker
                    <p>Block intrusive Advertisements</p>
                </div>
                <div className={""}>
                    Content Summary
                    <p>Generate AI Summaries</p>
                </div>
            </div>
            <div>
                Visual Accessibility
            </div>
            <div>
                Session Metrics
                <div className={"bg-blue-300 grid-flow-col grid-rows-2 gap-1"}>
                    <div className={""}>
                        Ads Blocked: {numAds}
                    </div>
                    <div className={""}>
                        Facts Checked: {numFacts}
                    </div>
                </div>
            </div>
            <button className={"bg-blue-950"} onClick={incNumAds}>
                Increase Ads!
            </button>
            <button className={"bg-blue-950"} onClick={incNumFacts}>
                Increase Facts!
            </button>

        </>
    )
}

export default App
