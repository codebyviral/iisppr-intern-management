import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      company: 'TechCorp',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop',
      quote: 'IISPPR has transformed how we manage our intern program. The platform is intuitive and powerful.',
      author: 'Bhaskar',
      role: 'HR Director'
    },
    {
      company: 'InnovateHub',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop',
      quote: 'The analytics and tracking features have helped us improve our internship program significantly.',
      author: 'Shivam',
      role: 'Technical Lead'
    },
    {
      company: 'Future Labs',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop',
      quote: "Best investment we've made for our internship program. The results speak for themselves.",
      author: 'Viral',
      role: 'Program Manager'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold blue-gradient-text mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-xl text-gray-400">
            See what our partners say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="stats-card p-8 hover:-translate-y-2 transition-transform"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.logo}
                  alt={testimonial.company}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-white">{testimonial.company}</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-6">"{testimonial.quote}"</p>
              <div className="border-t border-gray-800 pt-4">
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;