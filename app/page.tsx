import Link from 'next/link'
import Image from 'next/image'
import HeroCarousel from '../components/HeroCarousel'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <section className="relative">
        <HeroCarousel />
      </section>

      {/* Brand Introduction */}
      <section className="bg-black text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-wide mb-6">ECHELON</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 tracking-wide">
            ELEVATED MENSWEAR FOR THE MODERN GENTLEMAN
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover curated collections that blend timeless craftsmanship with contemporary design. 
            Each piece is meticulously crafted for those who appreciate the finer details.
          </p>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✈️",
                title: "Complimentary Shipping",
                description: "Free express delivery on orders over $200",
                bgColor: "bg-gray-900 text-white"
              },
              {
                icon: "🔄",
                title: "Hassle-Free Returns",
                description: "30-day returns with free pickup service",
                bgColor: "bg-gray-800 text-white"
              },
              {
                icon: "🎯",
                title: "Premium Craftsmanship",
                description: "Artisanal quality with attention to detail",
                bgColor: "bg-gray-900 text-white"
              }
            ].map((feature, index) => (
              <div key={index} className={`${feature.bgColor} rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">CURATED COLLECTIONS</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto tracking-wide">
              Explore our carefully selected ranges designed for the discerning gentleman
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "ESSENTIAL TOPS",
                description: "Premium tees & shirts",
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/products?category=t-shirts",
                count: "24 pieces"
              },
              {
                title: "TAILORED BOTTOMS",
                description: "Perfect fit guaranteed",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/products?category=pants",
                count: "16 styles"
              },
              {
                title: "OUTERWEAR",
                description: "Statement layers",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/products?category=jackets",
                count: "12 designs"
              },
              {
                title: "DRESS SHIRTS",
                description: "Formal excellence",
                image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/products?category=shirts",
                count: "18 variations"
              }
            ].map((category, index) => (
              <Link key={index} href={category.link} className="group">
                <div className="relative overflow-hidden rounded-none shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-light tracking-widest mb-2">{category.title}</h3>
                      <p className="text-gray-300 mb-2 text-sm">{category.description}</p>
                      <p className="text-xs text-gray-400 mb-4 tracking-wide">{category.count}</p>
                      <div className="flex items-center text-white font-light tracking-wide">
                        <span>DISCOVER</span>
                        <span className="ml-3 transition-transform group-hover:translate-x-2">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">SIGNATURE PIECES</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 tracking-wide">
              Our most acclaimed designs, celebrated for their exceptional quality and timeless appeal
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-black text-white px-8 py-4 rounded-none font-light tracking-wide hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              EXPLORE COLLECTION
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: 1,
                name: "Signature Cotton Tee",
                price: "$89.99",
                originalPrice: "$129.99",
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                colors: 3,
                badge: "BESTSELLER"
              },
              {
                id: 2,
                name: "Italian Wool Trousers",
                price: "$279.99",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                colors: 2,
                badge: "PREMIUM"
              },
              {
                id: 3,
                name: "Designer Denim Jacket",
                price: "$349.99",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                colors: 4,
                badge: "NEW"
              },
              {
                id: 4,
                name: "Oxford Dress Shirt",
                price: "$189.99",
                originalPrice: "$249.99",
                image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                colors: 5,
                badge: "SALE"
              }
            ].map((product) => (
              <div key={product.id} className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="relative overflow-hidden">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-xs font-light tracking-wide rounded-none ${
                          product.badge === "SALE" ? "bg-red-600 text-white" :
                          product.badge === "NEW" ? "bg-blue-600 text-white" :
                          product.badge === "BESTSELLER" ? "bg-green-600 text-white" :
                          "bg-gray-800 text-white"
                        }`}>
                          {product.badge}
                        </span>
                      </div>
                    )}
                    <button className="absolute bottom-4 left-4 right-4 bg-black text-white py-3 font-light tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                      ADD TO CART
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-light text-gray-900 text-lg mb-2 tracking-wide">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-900 font-normal text-xl">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 tracking-wide">{product.colors} color options</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="bg-black text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">ECHELON MEMBERSHIP</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto tracking-wide">
            Join our exclusive community for early access, member-only pricing, and personalized service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="bg-white text-black px-8 py-4 font-light tracking-wide hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              EXPLORE MEMBERSHIP
            </Link>
            <Link
              href="/products"
              className="border-2 border-white text-white px-8 py-4 font-light tracking-wide hover:bg-white hover:text-black transition-all duration-300"
            >
              SHOP COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">CLIENT TESTIMONIALS</h2>
            <p className="text-lg text-gray-600 tracking-wide">The Echelon Experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Michael R.", 
                review: "The attention to detail in every Echelon piece is remarkable. Finally, a brand that understands luxury menswear.", 
                rating: 5 
              },
              { 
                name: "Sarah K.", 
                review: "Exceptional quality and service. The pieces not only look incredible but stand the test of time.", 
                rating: 5 
              },
              { 
                name: "David L.", 
                review: "Echelon has redefined my wardrobe. The fit, fabric, and craftsmanship are consistently outstanding.", 
                rating: 5 
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex text-yellow-400 mb-6 text-lg justify-center">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-center italic">
                   &quot;{testimonial.review}&quot;
                </p>
                <p className="font-light text-gray-900 text-lg text-center tracking-wide">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
