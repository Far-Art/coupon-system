import "./CreditsPage.css";

export default function CreditsPage(): JSX.Element {
    function credits() {
        return (
            <div>
                <h2>Credits</h2>

                <p>Patterns provided by
                    <a target="_blank" rel="noreferrer noopener" href="https://www.patterncooler.com/#a12CbADc12Cd12Ce0f0g64h1B07049E71F1ABA4F4i81j0k64l1F4m1F4"> https://www.patterncooler.com</a>
                </p>

                <p>Main background provided by
                    <a target="_blank" rel="noreferrer noopener" href="https://bgjar.com/icon-grid"> https://bgjar.com</a>
                </p>

                <p>Shadows implementation by
                    <a target="_blank" rel="noreferrer" href="https://tobiasahlin.com/blog/layered-smooth-box-shadows/"> https://tobiasahlin.com</a>
                </p>

                <p>Login/Register animation inspired by
                    <a target="_blank" rel="noreferrer" href="https://animista.net/play/basic/flip/flip-vertical-left"> https://animista.net</a>
                </p>

                <p>Main title font provided by
                    <a target="_blank" rel="noreferrer" href="https://fonts.google.com/specimen/Oleo+Script+Swash+Caps?thickness=8#standard-styles"> https://fonts.google.com</a>
                </p>

                <p>Icons provided by
                    <a target="_blank" rel="noreferrer" href="https://mui.com/components/material-icons/"> https://mui.com</a>
                </p>

                <p>Tom and jerry gifs
                    <a target="_blank" rel="noreferrer" href="http://mrwgifs.com/wp-content/uploads/2014/01/Tom-and-Jerry-Depressed-By-On-The-Train-Tracks-In-Sad-Episode.gif"> Tom-and-Jerry-Depressed</a>
                    <a target="_blank" rel="noreferrer" href="https://c.tenor.com/Ohbgk_umVtgAAAAC/tom-and-jerry-dancing.gif"> Tom-dancing</a>
                </p>

                <p>Coupon images provided by
                    <a target="_blank" rel="noreferrer" href="https://source.unsplash.com/"> https://source.unsplash.com/</a>
                </p>

                <p>John Bryce for providing the Java fullstack course
                    <a target="_blank" rel="noreferrer" href="https://www.johnbryce.co.il/catalog/hi-tech-courses/java-full-stack-dvelopment"> https://www.johnbryce.co.il</a>
                </p>

                <p>And of course Kobi Shasha for changing life
                    <a target="_blank" rel="noreferrer" href="https://il.linkedin.com/in/kobishasha"> https://linkedin.com</a>
                </p>
            </div>
        );
    }

    // function documentation() {
    //     const features: string[] = [
    //         "Ability to register as customer or company",
    //         "Registering as company requires admin approval",
    //         "You can view coupons as unlogined client and add them to cart",
    //         "In order to purchase coupons you must login to system",
    //         ""
    //     ];
    //     return (
    //         <div>
    //             <h2>Documentation</h2>
    //             <ul>
    //                 {features.map(feature => <li>{feature}</li>)}
    //             </ul>
    //         </div>
    //     );
    // }

    return (
        <div className="CreditsPage">
            {credits()}
            {/* {documentation()} */}
        </div>
    );
}