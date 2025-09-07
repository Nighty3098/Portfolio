import { motion, scale } from "framer-motion";

function CatSvg() {
    return (
        <motion.div 
            className="avatar-image"
            style={{ color: "var(--fg)", display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 32.623001 58.785"
                version="1.1"
                style={{ maxWidth: "200px", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5, transform: "scaleX(-1)" }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="layer1" transform="translate(-177.9889,-10.10772)">
                    <path
                        transform="translate(92.3579,4.11772)"
                        d="m 105.809,48.397 c 0,-3.891 -3.336,-4.466 -3.336,-14.894"
                        style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.5px", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
                    />
                    <path
                        transform="translate(92.3579,4.11772)"
                        d="m 109.397,38.324 v 9.997"
                        style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.5px", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
                    />
                    <path
                        transform="translate(92.3579,4.11772)"
                        d="m 112.883,48.152 c 0,-3.435 2.17,-7.598 2.17,-13.068 0,-5.471 -0.66,-10.289 -0.837,-13.274"
                        style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.5px", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
                    />
                    <path
                        transform="translate(92.3579,4.11772)"
                        d="m 112.951,22.241 c 0,0 3.384,-0.265 4.553,-5.546"
                        style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.5px", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
                    />
                    <path
                        transform="translate(92.3579,4.11772)"
                        d="m 107.788,11.843 c 0,0 -1.419,-4.409 -2.619,-4.409 -1.2,0 -3.299,5.753 -3.299,14.428 0,2.241 -11.689,8.123 -9.211,21.709 0.398,2.18 1.394,6.337 1.394,6.353 0,0.016 2.518,9.529 -2.869,9.529 -1.121,0 -1.658,-0.62 -2.779,-0.62 -1.12,0 -2.024,0.765 -2.024,1.758 0,0.993 1.11,3.434 5.065,3.434 7.147,0 7.419,-5.987 7.419,-9.867 0,-3.88 -0.036,-2.679 -0.036,-3.314 0,-2.127 1.772,-2.56 2.43,-2.801"
                        style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.5px", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
                    />
                    <ellipse
                        transform="matrix(1.00474,-0.404483,0.370766,0.920982,85.4108,49.8267)"
                        cx="111.892"
                        cy="15.766"
                        rx="1.032"
                        ry="1.449"
                        style={{ fill: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
                    />
                    <path
                        transform="translate(92.3579,4.11772)"
                        d="m 110.074,10.347 c 3.543,0 4.374,4.288 7.066,4.288"
                        style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.5px", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
                    />
                    <path
                        transform="translate(92.3579,4.11772)"
                        d="m 112.568,9.074 c 0,0 -1.015,-2.334 -1.891,-2.334 -0.876,0 -2.14,2.429 -2.14,2.429"
                        style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.5px", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
                    />
                </g>
            </svg>
        </motion.div>
    );
}

export default CatSvg;
