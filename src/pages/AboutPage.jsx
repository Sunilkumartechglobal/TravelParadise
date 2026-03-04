import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <header className="hero-header">
        <h1>
                  <span className="brand-text"><span style={{color: 'red'}}>T</span>ourism <span style={{color: 'red'}}>P</span>aradise</span>
        </h1>
        <p>House Boat Rental Services • Driving Directions & Route Maps • Kerala & South Indian Tours</p>
      </header>

      <section className="intro">
        <h2>About Tourism Paradise</h2>
        <p>
            Tourism paradise. Kerala is perfect destination for adventure, culture, and relaxation. With its laid backwaters, Amazing beach scene, swaying elephant rides and gentile alleppey house boat cruises along tropical backwaters, you'll soon see with national geographic traveller voted Kerala tourism one of its ten paradise found there are many fascinating elements that make Kerala houseboat a good tourist spot. Of them the thick forests with Coconut trees allure many people all over the world. The hospitality shown by the keralites maker people to visit Kerala often, the literacy here is almost 100% the only state to have all literates in India. We prepare Kerala tour packages specially for you according to your tastes. We will design Kerala packages to your convenience, You just tell us where to go when to go and how much you can afford, We will do the rest for you, we can help you with your tours from your place to Kerala, Goa, Karnataka, Tamilnadu the four south Indian States which offer you diverse paradise tourism services.

        </p>
      </section>

      <section className="contact">
        <h2>Contact Information</h2>
        <p><FaPhoneAlt /> +91 9349401700</p>
        <p><em>Tourism Paradise House Boat Rental Services & Tourists Driving Directions Route Maps, India</em></p>
      </section>

      <section className="pricing">
        <h2>Kerala Houseboat Packages</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Capacity</th>
                <th>Price (₹)</th>
                <th>Check-in Location</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1 Bedroom Standard</td><td>2 Adults</td><td>6,500</td><td>Alappuzha</td></tr>
              <tr><td>1 Bedroom Luxury Honeymoon</td><td>2 Adults</td><td>7,500</td><td>Alappuzha</td></tr>
              <tr><td>2 Bedroom Private</td><td>4 People</td><td>8,000</td><td>Alappuzha</td></tr>
              <tr><td>2 Bedroom Canal Special</td><td>4 People</td><td>10,000</td><td>Alappuzha</td></tr>
              <tr><td>3 Bedroom</td><td>6 People</td><td>10,000</td><td>Alappuzha</td></tr>
              <tr><td>3 Bedroom Canal Special</td><td>6 People</td><td>13,000</td><td>Alappuzha</td></tr>
              <tr><td>4 Bedroom</td><td>8 People</td><td>12,000</td><td>Alappuzha & Kumarakom</td></tr>
              <tr><td>4 Bedroom Canal Special</td><td>8 People</td><td>16,000</td><td>Alappuzha</td></tr>
              <tr><td>5 Bedroom</td><td>10 People</td><td>15,000</td><td>Alappuzha & Kumarakom</td></tr>
              <tr><td>5 Bedroom Canal Special</td><td>10 People</td><td>18,000</td><td>Alappuzha</td></tr>
              <tr><td>6 Bedroom</td><td>12 People</td><td>20,000</td><td>Alappuzha & Kumarakom</td></tr>
              <tr><td>7 Bedroom</td><td>14 People</td><td>22,000</td><td>Alappuzha & Kumarakom</td></tr>
              <tr><td>8 Bedroom</td><td>16 People</td><td>26,000</td><td>Alappuzha & Kumarakom</td></tr>
              <tr><td>9 Bedroom</td><td>18 People</td><td>29,000</td><td>Alappuzha & Kumarakom</td></tr>
              <tr><td>10 Bedroom</td><td>20 People</td><td>33,000</td><td>Alappuzha & Kumarakom</td></tr>
              <tr><td>11 Bedroom</td><td>22 People</td><td>36,000</td><td>Alappuzha & Kumarakom</td></tr>
              <tr><td>12 Bedroom</td><td>24 People</td><td>40,000</td><td>Alappuzha & Kumarakom</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          * On weekends, festival days, or public holidays, charges increase by 40%. 
          Pocket-friendly offers and discounts are available via WhatsApp.
        </p>
      </section>

      <section className="activities">
        <h2>40% discount houseboat booking</h2>
        <p>
          Kerala Houseboat Services
Houseboat / Boat House one-two three four five six seven eight nine ten eleven twelve rooms regular standard deluxe super deluxe superior luxury premium category luxury premium ultra categories Alappuzha houseboats Kerala tourist boat house 1 2 3 4 5 6 7 8 9 10 11 12 bedroom Kumarakom and Nileshwaram House boats, Kerala house boat around 12 check-in places - Puvar, Kollam, Thottapally, Pallathuruthy, Alleppey ( alappuzha houseboat terminal High popular check in place in Kerala, facilities fresh up center, dormitory and rooms, travel desk, protection for tourists, ) kumarakom, ernakulam ( Cochin ), Nileshwaram, kannur, Kozhikode.

        </p>
        <h2>Day Trips & Adventures</h2>
        <ul>
          <li>Day Trip Standard (2 People Non-A/C): ₹5,000</li>
          <li>Luxury Day Trip: ₹8,000 (Extra ₹1,500 per person)</li>
          <li>Premium Day Trip: ₹10,000 (Extra ₹2,500 per person)</li>
          <li>Speed Boat (2 hours, up to 3 People): ₹4,000</li>
          <li>Shikara Open Boat (2 hours): ₹1,200</li>
          <li>Canoe Boat Village Tour (5 hours with food): ₹2,500</li>
          <li>Kayaking (2 People, 5 hours with food): ₹2,000</li>
        </ul>
      </section>

      <section className="tours">
        <h2>Tour Packages & Routes</h2>
        <p>
          Tourism Paradise arranges multi-destination tour packages customized to your holiday preferences:
        </p>
        <ul>
          <li>Cochin – Alleppey Houseboat (2 Nights)</li>
          <li>Cochin – Munnar – Alleppey (3 Nights Honeymoon/Family)</li>
          <li>Cochin – Munnar – Periyar – Alleppey (5 Nights Family)</li>
          <li>
            Cochin – Wayanad – Athirapally – Munnar – Periyar – Kumarakom – Houseboat 
            – Kovalam – Kanyakumari – Coutralam (10 Nights Family Tour)
          </li>
        </ul>

        <h3>Houseboat Routes</h3>
        <p>
          Alleppey • Kainakari • Pallathuruthy • Champakulam • Kanjipadam • Thottapally • 
          Thrikkunnapuzha • Alumkadavu • Palamana • Kollam • Puvar • Kavalam • Kidangara • 
          Nedumudi • Kumarakom • Vembanad Lake • Pathiramanal • Kottayam • Muhamma • 
          Thanneermukkam • Cheeppunkal • Kozhikode • Kannur • Nileshwaram
        </p>
      </section>

      <section className="facilities">
        <h2>Facilities & Features</h2>
        <ul>
          <li>Wooden or Steel Houseboats</li>
          <li>Double Deck / Upper Deck with Balcony</li>
          <li>Sunrise and Sunset Viewing Balconies</li>
          <li>Centralized A/C & Bio Toilets</li>
          <li>Eco-friendly Interiors & Furniture</li>
          <li>Asok Leyland Marine Engines</li>
          <li>Conference Hall for Corporate & Private Events</li>
          <li>DJ Music & Light Systems</li>
          <li>GPS-Based Route Monitoring</li>
        </ul>
      </section>
      <section className="Tourism Paradise Kerala House Boats package name and timing">
        <h2>Tourism Paradise Kerala House Boats package name and timing</h2>
        <p>Day and night trip timing 3 pm check in next day morning 11 am check out.
            Including - welcome drink, fruits, mineral water, lunch, evening tea and, dinner and breakfast,
            Over night trip timing 11:30 am check in next day morning 09 am check out, including - welcome drink, fruits, mineral water, lunch, evening tea and snacks, dinner and breakfast,
            Dy Trip 11 am to evening 05 pm, including - welcome drink, fruits, small breakfast, lunch, evening tea and snacks.
            Night Stay time 05:30 pm check out next day morning 11 am, including - welcome drink or tea, fruits basket, dinner and breakfast.
            Sunrise trip morning 05:30 starting 09 am check out, including - welcome tea or coffee, breakfast.
            Sunset trp timing 5:30 pm starting 09 pm check out, including welcome drink or tea and snacks, dinner.
            </p>
            <p>
                Lunch Trip timing 11:30 starting 2 pm check out, including - welcome drink, fruits, mineral water, lunch. Tea and snacks.
                Kayaking timing after 5:30 morning to evening before 6:30 pm any time.
                Canoe / open boat morning 5:30 to evening before 6:30 any time.
                Motor boat / Shikara boat morning before 5:30 to evening before 6:30 pm any time.
                Tourism Paradise Ayurvedic treatment tourism massaging.
                Knee treatment with home stay on month package.
                Ayurvedic massaging with doctor present.
            </p>
            <h3>
                Tourism Paradise hiring for.
            </h3>
            <p>
                House boats, rooms i alleppey, bicycle scooter bikes car jeep rickshaws house Homestay resort lake views property beach frontage properties apartments for twon and village island farm house plantation guest house in munnar Forest tree house or tent in Periyar ( thekkady ) or Wayanad alappuzha floating homes Kerala boat house bamboo house and rafting cave house mud home flats for rent or sales canoe,motorboat,motorboat

            </p>
      </section>

      <section className="wellness">
        <h2>Ayurveda & Cultural Experiences</h2>
        <ul>
          <li>Ayurvedic Massages & Doctor-Guided Treatments</li>
          <li>Knee Treatment with Monthly Homestay Packages</li>
          <li>Yoga & Meditation Programs</li>
          <li>Kerala Cookery & Boat Building Workshops</li>
          <li>Coir Rope, Handloom, and Mat Making</li>
          <li>Kerala Folklore Training Programs (1-Month Industrial Course)</li>
        </ul>
      </section>

      <section className="attractions">
        <h2>Nearby Waterfalls & Scenic Attractions</h2>
        <p>
          Explore the stunning waterfalls near Kerala’s backwaters: Kuttalam (Courtallam),
          Palaruvi, Athirambuzha (Kottayam), Athirapally, Vazhachal, Pothundi, and Alappuzha Water Banks.
        </p>
      </section>

      <section className="mission">
        <h2>Our Vision & Commitment</h2>
        <p>
          Tourism Paradise aims to create a perfect travel experience by combining comfort, culture,
          and affordability. Since our inception on 18 November 2000, under the leadership of 
          Ajayakumar (Ajayan), we have remained dedicated to ensuring tourist safety, satisfaction, 
          and unforgettable memories.
        </p>
      </section>

      <footer>
        <p>© 2025 Tourism Paradise — Alappuzha, Kerala, India | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default AboutPage;
