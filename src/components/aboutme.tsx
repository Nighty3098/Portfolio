import CatSvg from "./cat"

function AboutMePage() {
    return (
        <div id="about-me" className="content-block about-block content" style={{ height: "auto", minHeight: "100vh", padding: "var(--spacing-xl)", width: "calc(100% - var(--spacing-xl) - var(--spacing-xl))" }}>
            <div style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", textAlign: "left", gap: "var(--spacing-l)", padding: "0px", margin: "0px" }}>
                <h2>// Hello! I am Artem</h2>
                <p>I am 18 years old, and I spent 5 of them at the SAIKT Programming Academy, and now I am studying at SibSUTIS University</p>
                <p>I strive to grow in IT and work on large-scale projects that improve people's lives</p>
                <p>You can check out my open source projects on GitHub and in my organizations</p>
            </div>
            <CatSvg />
        </div>
    );
}

export default AboutMePage;
