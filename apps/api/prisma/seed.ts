import { url } from "inspector";
import { prisma } from "../src/configs/prisma-config.js";
import bcrypt from "bcryptjs";
import { TicketType } from "../generated/prisma/index.js";

// const prisma = new PrismaClient();

async function seed() {
  try {
    /* --------------------------------- DELETE --------------------------------- */
    await prisma.eventCategory.deleteMany();
    await prisma.event.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    console.info("Delete success");

    /* ----------------------------- Create Users ----------------------------- */
    const salt = await bcrypt.genSalt(10);

    await prisma.user.createMany({
      data: [
        {
          firstName: "Alice",
          lastName: "Johnson",
          email: "alice@example.com",
          phone: "081234567890",
          password: await bcrypt.hash("password123", salt),
          username: "alicejohn",
          referralCode: "alicejohn1023",
          role: "EVENT_ORGANIZER",
        },
        {
          firstName: "Bob",
          lastName: "Smith",
          email: "bob@example.com",
          phone: "082345678901",
          password: await bcrypt.hash("securepass456", salt),
          username: "bobsmith",
          referralCode: "bobsmith3851",
          role: "PARTICIPANT",
        },
        {
          firstName: "Carol",
          lastName: "Lee",
          email: "carol@example.com",
          password: await bcrypt.hash("mypassword789", salt),
          username: "carollee",
          phone: "081234567890",
          referralCode: "carollee5790",
          role: "EVENT_ORGANIZER",
        },
        {
          firstName: "David",
          lastName: "Kim",
          email: "davidkim@example.com",
          password: await bcrypt.hash("passw0rd321", salt),
          username: "davidkim",
          phone: "082345678901",
          referralCode: "davidkim8422",
          role: "PARTICIPANT",
        },
        {
          firstName: "Eva",
          lastName: "Brown",
          email: "eva@example.com",
          password: await bcrypt.hash("passwordABC", salt),
          username: "evabrown",
          phone: "083456789012",
          referralCode: "evabrown1836",
          role: "EVENT_ORGANIZER",
        },
        {
          firstName: "Jing",
          lastName: "Yuan",
          email: "jingyuan@mail.com",
          password: await bcrypt.hash("jingyuan123", salt),
          username: "jingyuan",
          phone: "085678901234",
          referralCode: "jingyuan7194",
          role: "PARTICIPANT",
        },
      ],
    });
    const userData = await prisma.user.findMany();

    /* ----------------------------- Create Events ----------------------------- */
    const eventsData = [
      {
        slug: "art-music-fest-2025",
        name: "Art & Music Fest 2025",
        shortDescription: "A creative explosion of art and music.",
        description:
          "Join us for a weekend full of creativity, live performances, and art installations from top talents.",
        eventDate: new Date("2025-08-12T17:00:00+07:00"),
        location: "Taman Ismail Marzuki, Jakarta",
        price: 500000,
        stock: 150,
        ticketTypes: TicketType.PAID,
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748341636/aleksandar-andreev-QgY8GB_ncZw-unsplash_xr8chz.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/art-content_q63yal.jpg",
          },
        ],
        salesStart: new Date("2025-06-01T00:00:00+07:00"),
        salesEnd: new Date("2025-08-11T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "startup-meetup-2025",
        name: "Startup Meetup 2025",
        shortDescription: "Connect with fellow entrepreneurs.",
        description:
          "A networking event for startup founders, VCs, and industry experts. Free to attend, registration required.",
        eventDate: new Date("2025-09-30T09:00:00+07:00"),
        location: "GoWork Plaza Indonesia, Jakarta",
        price: 0,
        stock: 100,
        ticketTypes: TicketType.FREE,
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/business-content_mmzsqg.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/food-content_o6jsrf.jpg",
          },
        ],
        salesStart: new Date("2025-08-01T00:00:00+07:00"),
        salesEnd: new Date("2025-09-29T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "culinary-expo-2025",
        name: "Culinary Expo 2025",
        shortDescription: "A food lover’s paradise.",
        description:
          "Taste signature dishes from over 50 chefs, with workshops and tasting sessions across the weekend.",
        eventDate: new Date("2025-10-05T12:00:00+07:00"),
        location: "Jakarta Convention Center (JCC), Jakarta",
        price: 750000,
        stock: 200,
        ticketTypes: TicketType.PAID,
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748341653/jainam-sheth-OlHQyIHQorc-unsplash_x1tbfp.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/food-content_o6jsrf.jpg",
          },
        ],
        salesStart: new Date("2025-08-15T00:00:00+07:00"),
        salesEnd: new Date("2025-10-04T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "tech-conference-2025",
        name: "Tech Conference 2025",
        shortDescription: "Explore tomorrow’s technology today.",
        description:
          "A 3-day conference featuring keynotes, panels, and demos from leading tech innovators and startups.",
        eventDate: new Date("2025-11-20T09:00:00+07:00"),
        location: "Menara Mandiri, Jakarta",
        price: 1000000,
        stock: 300,
        ticketTypes: TicketType.PAID,
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748341639/alex-kotliarskyi-ourQHRTE2IM-unsplash_lcgv6b.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/tech-content_bgohbr.jpg",
          },
        ],
        salesStart: new Date("2025-09-01T00:00:00+07:00"),
        salesEnd: new Date("2025-11-19T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "wellness-retreat-2025",
        name: "Wellness Retreat 2025",
        shortDescription: "Relax, reset, and reconnect with nature.",
        description:
          "A weekend retreat focusing on mindfulness, yoga, and natural wellness practices in a peaceful venue.",
        eventDate: new Date("2025-09-10T08:00:00+07:00"),
        location: "Ancol Eco Park, Jakarta",
        price: 250000,
        stock: 80,
        ticketTypes: "PAID",
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748341639/woody-kelly-uQcWUXFALww-unsplash_hkodbe.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/wellness-content_mdfcnm.jpg",
          },
        ],
        salesStart: new Date("2025-07-01T00:00:00+07:00"),
        salesEnd: new Date("2025-09-09T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "fashion-week-2025",
        name: "Fashion Week 2025",
        shortDescription: "A runway of style and innovation.",
        description:
          "Discover the latest collections from top designers at Jakarta's premier fashion event.",
        eventDate: new Date("2025-09-18T18:00:00+07:00"),
        location: "Senayan City, Jakarta",
        price: 1200000,
        stock: 250,
        ticketTypes: TicketType.PAID,
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/fashion-preview.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/fashion-content.jpg",
          },
        ],
        salesStart: new Date("2025-07-15T00:00:00+07:00"),
        salesEnd: new Date("2025-09-17T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "book-fair-2025",
        name: "International Book Fair 2025",
        shortDescription: "A celebration of literature from around the world.",
        description:
          "Meet authors, attend panels, and discover new titles at Indonesia’s biggest book fair.",
        eventDate: new Date("2025-10-12T10:00:00+07:00"),
        location: "Jakarta International Expo (JIExpo), Jakarta",
        price: 50000,
        stock: 500,
        ticketTypes: TicketType.PAID,
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/book-preview.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/book-content.jpg",
          },
        ],
        salesStart: new Date("2025-08-20T00:00:00+07:00"),
        salesEnd: new Date("2025-10-11T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "gaming-expo-2025",
        name: "Gaming Expo 2025",
        shortDescription: "Level up your gaming experience.",
        description:
          "Test new releases, compete in tournaments, and meet gaming influencers at the largest gaming expo in Jakarta.",
        eventDate: new Date("2025-11-05T10:00:00+07:00"),
        location: "Balai Kartini, Jakarta",
        price: 100000,
        stock: 400,
        ticketTypes: TicketType.PAID,
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/gaming-preview.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/gaming-content.jpg",
          },
        ],
        salesStart: new Date("2025-09-01T00:00:00+07:00"),
        salesEnd: new Date("2025-11-04T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "film-festival-2025",
        name: "Jakarta Film Festival 2025",
        shortDescription: "Celebrating the best in cinema.",
        description:
          "Screenings, discussions, and awards showcasing films from across the globe.",
        eventDate: new Date("2025-10-25T19:00:00+07:00"),
        location: "CGV Grand Indonesia, Jakarta",
        price: 150000,
        stock: 300,
        ticketTypes: TicketType.PAID,
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/film-preview.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/film-content.jpg",
          },
        ],
        salesStart: new Date("2025-08-10T00:00:00+07:00"),
        salesEnd: new Date("2025-10-24T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "comic-con-2025",
        name: "Comic Con 2025",
        shortDescription: "Where fans meet heroes.",
        description:
          "A pop culture extravaganza featuring comics, games, cosplay, and more.",
        eventDate: new Date("2025-09-25T10:00:00+07:00"),
        location: "JCC Senayan, Jakarta",
        price: 200000,
        stock: 350,
        ticketTypes: TicketType.PAID,
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/comic-preview.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/comic-content.jpg",
          },
        ],
        salesStart: new Date("2025-07-20T00:00:00+07:00"),
        salesEnd: new Date("2025-09-24T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: "coffee-festival-2025",
        name: "Coffee Festival 2025",
        shortDescription: "Brewing connections, one cup at a time.",
        description:
          "Sample the best local and international coffees, learn from baristas, and shop brewing gear.",
        eventDate: new Date("2025-10-15T09:00:00+07:00"),
        location: "Lippo Mall Kemang, Jakarta",
        price: 75000,
        stock: 200,
        ticketTypes: TicketType.PAID,
        imagePreview: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/coffee-preview.jpg",
          },
        ],
        imageContent: [
          {
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748833172/coffee-content.jpg",
          },
        ],
        salesStart: new Date("2025-08-10T00:00:00+07:00"),
        salesEnd: new Date("2025-10-14T23:59:59+07:00"),
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const event of eventsData) {
      const created = await prisma.event.create({
        data: {
          slug: event.slug,
          name: event.name,
          shortDescription: event.shortDescription,
          description: event.description,
          eventDate: event.eventDate,
          location: event.location,
          price: event.price,
          stock: event.stock,
          ticketTypes: event.ticketTypes as TicketType,
          imagePreview: {
            create: event.imagePreview.map((img) => ({
              imageUrl: img.url,
            })),
          },
          imageContent: {
            create: event.imageContent.map((img) => ({
              imageUrl: img.url,
            })),
          },
          salesStart: event.salesStart,
          salesEnd: event.salesEnd,
          userId: event.userId,
        },
      });

      console.log(`Created event ${created.name}`);
    }

    /* ---------------------------- Create Categories --------------------------- */
    const categories = [
      {
        name: "Visual Arts",
        image:
          "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748807925/comedy_aogkak.png",
        description: "Events and activities related to visual arts.",
      },
      {
        name: "Business",
        image:
          "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748807925/portfolio_fomgzk.png",
        description:
          "Conferences, seminars, and networking events in business and entrepreneurship.",
      },
      {
        name: "Music",
        image:
          "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748805951/music_iolk8x.png",
        description: "Concerts, gigs, and music festivals.",
      },
      {
        name: "Hobbies",
        image:
          "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748807925/hobbies_iv6nqg.png",
        description:
          "Workshops, meetups, and events for personal hobbies and interests.",
      },
      {
        name: "Nightlife",
        image:
          "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748805952/nightlife_fhzkqt.png",
        description: "Parties, club events, and nightlife experiences.",
      },
      {
        name: "Food & Drink",
        image:
          "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748807924/dinner_vewfqs.png",
        description:
          "Food festivals, tasting events, and culinary experiences.",
      },
    ];

    for (const category of categories) {
      await prisma.category.create({
        data: {
          description: category.description,
          image: category.image,
          name: category.name,
        },
      });
    }

    console.log("Category seeding finished.");
    /* ---------------------------- Assign Event Categories --------------------------- */

    // Assign categories to events
    const allCategories = await prisma.category.findMany();
    const allEvents = await prisma.event.findMany();

    for (const event of allEvents) {
      const maxCategories = 4;
      const numberOfCategories = Math.floor(
        Math.random() * (maxCategories + 1)
      ); // 0 to 4 inclusive
      const shuffledCategories = allCategories.sort(() => 0.5 - Math.random());

      for (let i = 0; i < numberOfCategories; i++) {
        await prisma.eventCategory.create({
          data: {
            eventId: event.id,
            categoryId: shuffledCategories[i].id,
          },
        });
      }
      console.log(
        `Assigned ${numberOfCategories} categories to event ${event.name}`
      );
    }
  } catch (error) {
    console.error("Error seeding database", error);
  } finally {
    await prisma.$disconnect();
    console.log("Database seeding completed.");
  }
}

seed();
