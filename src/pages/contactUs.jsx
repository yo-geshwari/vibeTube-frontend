import Navbar from '../components/navbar';
import LiquidChrome from '../components/LiquidChrome';

export default function ContactUs() {
  return (
    <div>
    <Navbar login={false} register={false} home={true}/>

    {/* Background Liquid Effect */}
          <div className="fixed inset-0 -z-10">
            <LiquidChrome
              baseColor={[0.9, 0.9, 0.95]}
              speed={0.2}
              amplitude={0.3}
              interactive={false}
            />
          </div>

    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-lg text-center mb-8">
        Feel free to contact us for any recommendations or collaboration.
      </p>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <span className="font-semibold w-24">Email:</span>
          <span className="text-gray-700">yogeshwarikanwar26@gmail.com</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="font-semibold w-24">Phone:</span>
          <span className="text-gray-700">+91 80786 70184</span> 
        </div>

        <div className="flex items-center space-x-4">
          <span className="font-semibold w-24">Instagram:</span>
          <span className="text-gray-700">@_yogeshwari___._</span> 
        </div>

      </div>
    </div>
    </div>
  );
}
