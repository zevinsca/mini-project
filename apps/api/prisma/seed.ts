import { url } from "inspector";
import { prisma } from "../src/configs/prisma-config.js";
import bcrypt from "bcryptjs";
import { TicketType } from "../generated/prisma/index.js";

// const prisma = new PrismaClient();
const salt = await bcrypt.genSalt(10);

async function seed() {
  try {
    /* --------------------------------- DELETE --------------------------------- */
    await prisma.eventCategory.deleteMany();
    await prisma.event.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    console.info("Delete success");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("newpass", salt);

    // const user1 = await prisma.user.create({
    //   data: {
    //     firstName: "Andi",
    //     lastName: "Pratama",
    //     username: "andiprtm",
    //     email: "andi.pratama@mail.com",
    //     password: hashedPassword,
    //     phone: "081234567890",
    //     role: "PARTICIPANT",
    //     referralCode: "REFANDI01",
    //   },
    // });

    /* ----------------------------- Create Users ----------------------------- */
    const usersData = [
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        password: await bcrypt.hash("password123", salt),
        username: "alicejohn",
        referralCode: "alicejohn1023",
        role: "EVENT_ORGANIZER",
      },
      {
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@example.com",
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
    ];

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

    /* ----------------------------- Create Events ----------------------------- */
    const userData = await prisma.user.findMany();

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
            url: "https://res.cloudinary.com/dzdcqjvtc/image/upload/v1748341635/md-duran-E0ylfF52C6M-unsplash_usud4c.jpg",
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
        salesStart: new Date("2025-07-01T00:00:00+07:00"),
        salesEnd: new Date("2025-09-09T23:59:59+07:00"),
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
          salesStart: event.salesStart,
          salesEnd: event.salesEnd,
          userId: event.userId,
        },
      });

      console.log(`Created event $(created.name)`);
    }

    // await prisma.event.createMany({
    //   data: [
    //     {
    //       slug: "art-music-fest-2025",
    //       name: "Art & Music Fest 2025",
    //       shortDescription: "A creative explosion of art and music.",
    //       description:
    //         "Join us for a weekend full of creativity, live performances, and art installations from top talents.",
    //       eventDate: new Date("2025-08-12T17:00:00+07:00"),
    //       location: "Taman Ismail Marzuki, Jakarta",
    //       price: 500000,
    //       stock: 150,
    //       ticketTypes: "PAID",
    //       salesStart: new Date("2025-06-01T00:00:00+07:00"),
    //       salesEnd: new Date("2025-08-11T23:59:59+07:00"),
    //       userId: userData[0].id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       slug: "startup-meetup-2025",
    //       name: "Startup Meetup 2025",
    //       shortDescription: "Connect with fellow entrepreneurs.",
    //       description:
    //         "A networking event for startup founders, VCs, and industry experts. Free to attend, registration required.",
    //       eventDate: new Date("2025-09-30T09:00:00+07:00"),
    //       location: "GoWork Plaza Indonesia, Jakarta",
    //       price: 0,
    //       stock: 100,
    //       ticketTypes: "FREE",
    //       salesStart: new Date("2025-08-01T00:00:00+07:00"),
    //       salesEnd: new Date("2025-09-29T23:59:59+07:00"),
    //       userId: userData[0].id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       slug: "culinary-expo-2025",
    //       name: "Culinary Expo 2025",
    //       shortDescription: "A food lover’s paradise.",
    //       description:
    //         "Taste signature dishes from over 50 chefs, with workshops and tasting sessions across the weekend.",
    //       eventDate: new Date("2025-10-05T12:00:00+07:00"),
    //       location: "Jakarta Convention Center (JCC), Jakarta",
    //       price: 750000,
    //       stock: 200,
    //       ticketTypes: "PAID",
    //       salesStart: new Date("2025-08-15T00:00:00+07:00"),
    //       salesEnd: new Date("2025-10-04T23:59:59+07:00"),
    //       userId: userData[0].id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       slug: "tech-conference-2025",
    //       name: "Tech Conference 2025",
    //       shortDescription: "Explore tomorrow’s technology today.",
    //       description:
    //         "A 3-day conference featuring keynotes, panels, and demos from leading tech innovators and startups.",
    //       eventDate: new Date("2025-11-20T09:00:00+07:00"),
    //       location: "Menara Mandiri, Jakarta",
    //       price: 1000000,
    //       stock: 300,
    //       ticketTypes: "PAID",
    //       salesStart: new Date("2025-09-01T00:00:00+07:00"),
    //       salesEnd: new Date("2025-11-19T23:59:59+07:00"),
    //       userId: userData[0].id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       slug: "wellness-retreat-2025",
    //       name: "Wellness Retreat 2025",
    //       shortDescription: "Relax, reset, and reconnect with nature.",
    //       description:
    //         "A weekend retreat focusing on mindfulness, yoga, and natural wellness practices in a peaceful venue.",
    //       eventDate: new Date("2025-09-10T08:00:00+07:00"),
    //       location: "Ancol Eco Park, Jakarta",
    //       price: 250000,
    //       stock: 80,
    //       ticketTypes: "PAID",
    //       salesStart: new Date("2025-07-01T00:00:00+07:00"),
    //       salesEnd: new Date("2025-09-09T23:59:59+07:00"),
    //       userId: userData[0].id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    // });
  } catch (error) {
    console.error("Error seeding database", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

// /* ----------------------------- Create Events ----------------------------- */
// const userData = await prisma.user.findMany();

// const eventsData = [
//   {
//     slug: "art-music-fest-2025",
//     name: "Art & Music Fest 2025",
//     shortDescription: "A creative explosion of art and music.",
//     description:
//       "Join us for a weekend full of creativity, live performances, and art installations from top talents.",
//     eventDate: new Date("2025-08-12T17:00:00+07:00"),
//     location: "Taman Ismail Marzuki, Jakarta",
//     price: 500000,
//     stock: 150,
//     ticketTypes: "PAID",
//     salesStart: new Date("2025-06-01T00:00:00+07:00"),
//     salesEnd: new Date("2025-08-11T23:59:59+07:00"),
//     userId: userData[0].id,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     slug: "startup-meetup-2025",
//     name: "Startup Meetup 2025",
//     shortDescription: "Connect with fellow entrepreneurs.",
//     description:
//       "A networking event for startup founders, VCs, and industry experts. Free to attend, registration required.",
//     eventDate: new Date("2025-09-30T09:00:00+07:00"),
//     location: "GoWork Plaza Indonesia, Jakarta",
//     price: 0,
//     stock: 100,
//     ticketTypes: "FREE",
//     salesStart: new Date("2025-08-01T00:00:00+07:00"),
//     salesEnd: new Date("2025-09-29T23:59:59+07:00"),
//     userId: userData[0].id,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     slug: "culinary-expo-2025",
//     name: "Culinary Expo 2025",
//     shortDescription: "A food lover’s paradise.",
//     description:
//       "Taste signature dishes from over 50 chefs, with workshops and tasting sessions across the weekend.",
//     eventDate: new Date("2025-10-05T12:00:00+07:00"),
//     location: "Jakarta Convention Center (JCC), Jakarta",
//     price: 750000,
//     stock: 200,
//     ticketTypes: "PAID",
//     salesStart: new Date("2025-08-15T00:00:00+07:00"),
//     salesEnd: new Date("2025-10-04T23:59:59+07:00"),
//     userId: userData[0].id,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     slug: "tech-conference-2025",
//     name: "Tech Conference 2025",
//     shortDescription: "Explore tomorrow’s technology today.",
//     description:
//       "A 3-day conference featuring keynotes, panels, and demos from leading tech innovators and startups.",
//     eventDate: new Date("2025-11-20T09:00:00+07:00"),
//     location: "Menara Mandiri, Jakarta",
//     price: 1000000,
//     stock: 300,
//     ticketTypes: "PAID",
//     salesStart: new Date("2025-09-01T00:00:00+07:00"),
//     salesEnd: new Date("2025-11-19T23:59:59+07:00"),
//     userId: userData[0].id,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     slug: "wellness-retreat-2025",
//     name: "Wellness Retreat 2025",
//     shortDescription: "Relax, reset, and reconnect with nature.",
//     description:
//       "A weekend retreat focusing on mindfulness, yoga, and natural wellness practices in a peaceful venue.",
//     eventDate: new Date("2025-09-10T08:00:00+07:00"),
//     location: "Ancol Eco Park, Jakarta",
//     price: 250000,
//     stock: 80,
//     ticketTypes: "PAID",
//     salesStart: new Date("2025-07-01T00:00:00+07:00"),
//     salesEnd: new Date("2025-09-09T23:59:59+07:00"),
//     userId: userData[0].id,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

// await prisma.event.createMany({
//   data: [
//     {
//       slug: "art-music-fest-2025",
//       name: "Art & Music Fest 2025",
//       shortDescription: "A creative explosion of art and music.",
//       description:
//         "Join us for a weekend full of creativity, live performances, and art installations from top talents.",
//       eventDate: new Date("2025-08-12T17:00:00+07:00"),
//       location: "Taman Ismail Marzuki, Jakarta",
//       price: 500000,
//       stock: 150,
//       ticketTypes: "PAID",
//       salesStart: new Date("2025-06-01T00:00:00+07:00"),
//       salesEnd: new Date("2025-08-11T23:59:59+07:00"),
//       userId: userData[0].id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       slug: "startup-meetup-2025",
//       name: "Startup Meetup 2025",
//       shortDescription: "Connect with fellow entrepreneurs.",
//       description:
//         "A networking event for startup founders, VCs, and industry experts. Free to attend, registration required.",
//       eventDate: new Date("2025-09-30T09:00:00+07:00"),
//       location: "GoWork Plaza Indonesia, Jakarta",
//       price: 0,
//       stock: 100,
//       ticketTypes: "FREE",
//       salesStart: new Date("2025-08-01T00:00:00+07:00"),
//       salesEnd: new Date("2025-09-29T23:59:59+07:00"),
//       userId: userData[0].id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       slug: "culinary-expo-2025",
//       name: "Culinary Expo 2025",
//       shortDescription: "A food lover’s paradise.",
//       description:
//         "Taste signature dishes from over 50 chefs, with workshops and tasting sessions across the weekend.",
//       eventDate: new Date("2025-10-05T12:00:00+07:00"),
//       location: "Jakarta Convention Center (JCC), Jakarta",
//       price: 750000,
//       stock: 200,
//       ticketTypes: "PAID",
//       salesStart: new Date("2025-08-15T00:00:00+07:00"),
//       salesEnd: new Date("2025-10-04T23:59:59+07:00"),
//       userId: userData[0].id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       slug: "tech-conference-2025",
//       name: "Tech Conference 2025",
//       shortDescription: "Explore tomorrow’s technology today.",
//       description:
//         "A 3-day conference featuring keynotes, panels, and demos from leading tech innovators and startups.",
//       eventDate: new Date("2025-11-20T09:00:00+07:00"),
//       location: "Menara Mandiri, Jakarta",
//       price: 1000000,
//       stock: 300,
//       ticketTypes: "PAID",
//       salesStart: new Date("2025-09-01T00:00:00+07:00"),
//       salesEnd: new Date("2025-11-19T23:59:59+07:00"),
//       userId: userData[0].id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       slug: "wellness-retreat-2025",
//       name: "Wellness Retreat 2025",
//       shortDescription: "Relax, reset, and reconnect with nature.",
//       description:
//         "A weekend retreat focusing on mindfulness, yoga, and natural wellness practices in a peaceful venue.",
//       eventDate: new Date("2025-09-10T08:00:00+07:00"),
//       location: "Ancol Eco Park, Jakarta",
//       price: 250000,
//       stock: 80,
//       ticketTypes: "PAID",
//       salesStart: new Date("2025-07-01T00:00:00+07:00"),
//       salesEnd: new Date("2025-09-09T23:59:59+07:00"),
//       userId: userData[0].id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ],
// });
