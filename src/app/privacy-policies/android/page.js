import Image from 'next/image';


export default function Android() {


    return (
        <div className='w-full h-full overflow-y-auto whitespace-pre-wrap pt-[6rem] pb-[3rem] md:px-[20%] px-[10%]' id='test'>
            <div className='w-[5rem] h-[5rem] relative !opacity-100'>
                <Image src={'/dhamma-icon.png'} fill />
            </div>
            <div className='opacity-60'>
                <h1 className="font-bold text-[1.5rem]">{'Privacy Policy for Dhamma app'}</h1>
                <div className="pb-5 font-light text-[0.8rem]">{'Effective Date: 2023-12-01'}</div>

                <h3 className="font-bold text-[1.3rem]">{'1. Introduction'}</h3>
                <div>{'Welcome to Dhamma app ("we," "our," or "us"). This Privacy Policy is designed to inform you about the types of information we collect, how we use it, and how we protect your privacy when you use our mobile application, available on the Google Play Store.'}</div>


                <h3 className="font-bold text-[1.2rem]">{'2. Information We Collect'}</h3>
                <h4 className="font-bold">{'2.1. User-Provided Information:'}</h4>
                <div>{'We may collect personal information you provide when using our app, such as [list specific information, e.g., name, email address, etc.].'}</div>

                <h4 className="font-bold">{'2.2. Automatically Collected Information:'}</h4>
                <div>{'Our app may collect certain information automatically, including [describe types of data, e.g., device information, usage statistics, etc.].'}</div>

                <h4 className="font-bold">{'2.3. Permissions:'}</h4>
                <div>{'The app may request certain permissions on your device to function properly. These permissions may include [list specific permissions required and their purposes].'}</div>


                <h3 className="font-bold text-[1.2rem]">{'3. How We Use Your Information'}</h3>
                <div>
                    {`We use the information we collect for various purposes, including but not limited to:
    Providing and improving our app's features and functionality.
    Personalizing your experience.
    Analyzing usage patterns to enhance user satisfaction.`}
                </div>



                <h3 className="font-bold text-[1.2rem]">{'4. Third-Party Services'}</h3>
                <div>{'Our app may utilize third-party services, and their use of your information is governed by their respective privacy policies. These services may include [list relevant third-party services, e.g., analytics, advertising networks].'}</div>

                <h3 className="font-bold text-[1.2rem]">{'5. Security Measures'}</h3>
                <div>{'We take reasonable measures to protect your information from unauthorized access or disclosure. However, please be aware that no data transmission over the internet is entirely secure.'}</div>

                {/* <h3 className="font-bold text-[1.2rem]">6. Opt-Out Choices</h3>
                <h4 className="font-bold">a. Opt-Out of Analytics:</h4>
                <div>You can opt-out of certain analytics services by [provide instructions or a link].</div>

                <h4 className="font-bold">b. Push Notifications:</h4>
                <div>You can control push notifications preferences through your device settings.</div> */}

                {/* <h3 className="font-bold text-[1.2rem]">7. Children's Privacy</h3>
                <div>Our app is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13 years old.</div> */}

                <h3 className="font-bold text-[1.2rem]">{'6. Changes to This Privacy Policy'}</h3>
                <div>{'We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting.'}</div>

                <h3 className="font-bold text-[1.2rem]">{'7. Contact Information'}</h3>
                <div>{'If you have any questions or concerns about this Privacy Policy, please contact us at +95-9795788102.'}</div>
            </div>

        </div>
    )
}