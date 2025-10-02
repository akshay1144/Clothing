import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          
          {/* Brand Logo */}
          <div className="mb-12 flex justify-center">
            <div className="text-center">
              <Logo />
            </div>
          </div>
          
          {/* Membership Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              MEMBER
              <span className="block text-3xl md:text-4xl text-blue-400 mt-2 font-light">WEDNESDAYS</span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-200 mb-4 leading-tight font-light">
              50% OFF ON ALL ITEMS
            </p>
            <p className="text-xl text-gray-300 tracking-wide">
              GET EXCLUSIVE ACCESS TO WEEKLY DEALS
            </p>
          </div>

          {/* Promotion Details */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
            <p className="text-lg text-gray-300 mb-6 tracking-wide">
              ( WINNERS WILL BE ANNOUNCED ON OUR INSTAGRAM NEXT WEDNESDAY )
            </p>
            
            <div className="bg-black/50 rounded-xl p-6 border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2 tracking-wide">
                OUR MEMBERSHIP CONCIERGE WILL NOTIFY WINNERS
              </p>
              <p className="text-gray-400 text-sm tracking-wide">
                ( WINNERS WILL BE ANNOUNCED ON OUR INSTAGRAM NEXT WEDNESDAY )
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 tracking-wide">
              JOIN THE WAITLIST
            </button>
            <Link 
              href="/products" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 tracking-wide"
            >
              SHOP NEW ARRIVALS
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Preview */}
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-light tracking-widest text-center mb-12">NEW ARRIVALS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Signature Blazer",
                price: "$299.99",
                image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                category: "Formal"
              },
              {
                name: "Premium Wool Coat",
                price: "$349.99",
                image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                category: "Outerwear"
              },
              {
                name: "Designer Denim",
                price: "$189.99",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                category: "Casual"
              }
            ].map((item, index) => (
              <div key={index} className="group bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-2xl font-light text-blue-400">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-16 bg-black border-t border-gray-800">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-light tracking-widest mb-12">WHY JOIN ECHELON?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Exclusive Access",
                description: "First dibs on new collections and limited editions"
              },
              {
                icon: "💰",
                title: "Member Pricing",
                description: "Special discounts and early access to sales"
              },
              {
                icon: "🚀",
                title: "Priority Service",
                description: "Dedicated concierge and faster shipping"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
