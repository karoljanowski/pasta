import HiddenText from "./HiddenText";
import ImageWithDescription from "./ImageWithDescription";

const About = () => {

    return (
        <div id="about" className="bg-red-700 pt-16">
            <div className="container mx-auto">
                <div className="text-white flex flex-col items-center px-4">
                    <HiddenText text={'About us'} style="text-5xl md:text-7xl xl:text-9xl text-white text-center uppercase" />
                    <ImageWithDescription
                        heading={'Pizza'}
                        text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae nisi varius, facilisis dolor vel, bibendum turpis. Fusce quis hendrerit magna. Phasellus maximus, orci a scelerisque eleifend'}
                        image={'/about1.webp'}
                        reverse={false}
                    />
                    <ImageWithDescription
                        heading={'Pasta'}
                        text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae nisi varius, facilisis dolor vel, bibendum turpis. Fusce quis hendrerit magna. Phasellus maximus, orci a scelerisque eleifend'}
                        image={'/about2.webp'}
                        reverse={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default About;