import { User, UserAttrs } from "../models/userModel";

const seedUsers = async () => {
  try {
    // // Clear existing users (optional, comment out if you don't want to wipe)
    // await User.deleteMany({});

    const usersData: UserAttrs[] = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "hashedpassword1", // In real app, hash this with bcrypt
        role: "customer",
        providers: ["credentials"],
        emailVerified: true,
        status: "active",
        lastLogin: new Date("2025-01-15T10:30:00Z"),
      },
      // User 2: Basic user, credentials, not verified
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "hashedpassword2",
        role: "customer",
        providers: ["credentials"],
        emailVerified: false,
        status: "active",
        lastLogin: undefined,
      },
      // User 3: Admin, credentials + Google, verified
      {
        name: "Admin User",
        email: "admin@company.com",
        password: "hashedpassword3",
        role: "admin",
        image: "https://example.com/admin-avatar.jpg",
        providers: ["credentials", "google"],
        providerIds: new Map([["google", "google_user_id_123"]]),
        emailVerified: true,
        status: "active",
        lastLogin: new Date("2025-02-01T14:20:00Z"),
      },
      // User 4: Moderator, Google only, verified
      {
        name: "Mod Johnson",
        email: "mod.johnson@example.com",
        role: "moderator",
        image: "https://example.com/mod-avatar.png",
        providers: ["google"],
        providerIds: new Map([["google", "google_user_id_456"]]),
        emailVerified: true,
        status: "active",
        lastLogin: new Date("2025-01-20T09:15:00Z"),
      },
      // User 5: User, GitHub only, not verified
      {
        name: "GitHub User",
        email: "github.user@example.com",
        role: "customer",
        providers: ["github"],
        providerIds: new Map([["github", "github_user_id_789"]]),
        emailVerified: false,
        status: "active",
        lastLogin: new Date("2025-11-10T16:45:00Z"),
      },
      // User 6: User, Facebook + credentials, verified
      {
        name: "Facebook Jane",
        email: "fb.jane@example.com",
        password: "hashedpassword6",
        role: "customer",
        providers: ["credentials", "facebook"],
        providerIds: new Map([["facebook", "fb_user_id_101"]]),
        emailVerified: true,
        status: "active",
        lastLogin: undefined,
      },
      // User 7: Blocked user, credentials, not verified
      {
        name: "Inactive Bob",
        email: "bob.inactive@example.com",
        password: "hashedpassword7",
        role: "customer",
        providers: ["credentials"],
        emailVerified: false,
        status: "blocked",
        lastLogin: new Date("2024-12-01T12:00:00Z"),
      },
      // User 8: Admin, credentials only, verified
      {
        name: "Super Admin",
        email: "superadmin@company.com",
        password: "hashedpassword8",
        role: "admin",
        providers: ["credentials"],
        emailVerified: true,
        status: "active",
        lastLogin: new Date("2025-03-05T11:10:00Z"),
      },
      // User 9: Moderator, Google + GitHub, verified
      {
        name: "Multi Provider Mod",
        email: "multi.mod@example.com",
        role: "moderator",
        image: "https://example.com/multi-avatar.jpg",
        providers: ["google", "github"],
        providerIds: new Map([
          ["google", "google_user_id_222"],
          ["github", "github_user_id_333"],
        ]),
        emailVerified: true,
        status: "active",
        lastLogin: new Date("2025-01-25T13:30:00Z"),
      },
      // User 10: User, credentials, not verified, recent login
      {
        name: "New User",
        email: "new.user@example.com",
        password: "hashedpassword10",
        role: "customer",
        providers: ["credentials"],
        emailVerified: false,
        status: "active",
        lastLogin: new Date("2025-12-01T08:00:00Z"),
      },
      // User 11: User, Facebook only, verified
      {
        name: "FB Fan",
        email: "fb.fan@example.com",
        role: "customer",
        providers: ["facebook"],
        providerIds: new Map([["facebook", "fb_user_id_444"]]),
        emailVerified: true,
        status: "active",
        lastLogin: undefined,
      },
      // User 12: Moderator, credentials, not verified
      {
        name: "Mod Pending",
        email: "mod.pending@example.com",
        password: "hashedpassword12",
        role: "moderator",
        providers: ["credentials"],
        emailVerified: false,
        status: "active",
        lastLogin: new Date("2025-02-10T15:20:00Z"),
      },
      // User 13: User, all providers, verified
      {
        name: "All In One",
        email: "allin@example.com",
        password: "hashedpassword13",
        role: "customer",
        providers: ["credentials", "google", "github", "facebook"],
        providerIds: new Map([
          ["google", "google_user_id_555"],
          ["github", "github_user_id_666"],
          ["facebook", "fb_user_id_777"],
        ]),
        emailVerified: true,
        status: "active",
        lastLogin: new Date("2025-01-30T10:45:00Z"),
      },
      // User 14: Admin, GitHub only, verified
      {
        name: "Git Admin",
        email: "git.admin@example.com",
        role: "admin",
        providers: ["github"],
        providerIds: new Map([["github", "github_user_id_888"]]),
        emailVerified: true,
        status: "active",
        lastLogin: undefined,
      },
      // User 15: User, credentials, verified, old login - INACTIVE
      {
        name: "Old Timer",
        email: "old.timer@example.com",
        password: "hashedpassword15",
        role: "customer",
        providers: ["credentials"],
        emailVerified: true,
        status: "inactive",
        lastLogin: new Date("2024-06-15T09:00:00Z"),
      },
      // User 16: Blocked moderator, Google, not verified
      {
        name: "Inactive Mod",
        email: "inactive.mod@example.com",
        role: "moderator",
        providers: ["google"],
        providerIds: new Map([["google", "google_user_id_999"]]),
        emailVerified: false,
        status: "blocked",
        lastLogin: new Date("2025-01-05T17:30:00Z"),
      },
      // User 17: User, Facebook + Google, verified
      {
        name: "Social User",
        email: "social.user@example.com",
        role: "customer",
        image: "https://example.com/social-avatar.png",
        providers: ["facebook", "google"],
        providerIds: new Map([
          ["facebook", "fb_user_id_000"],
          ["google", "google_user_id_111"],
        ]),
        emailVerified: true,
        status: "active",
        lastLogin: new Date("2025-02-20T12:15:00Z"),
      },
      // User 18: Admin, credentials, not verified - INACTIVE
      {
        name: "Admin Pending",
        email: "admin.pending@example.com",
        password: "hashedpassword18",
        role: "admin",
        providers: ["credentials"],
        emailVerified: false,
        status: "inactive",
        lastLogin: undefined,
      },
      // User 19: User, credentials only, verified
      {
        name: "Simple User",
        email: "simple.user@example.com",
        password: "hashedpassword19",
        role: "customer",
        providers: ["credentials"],
        emailVerified: true,
        status: "active",
        lastLogin: new Date("2025-03-10T14:00:00Z"),
      },
      // User 20: Moderator, all providers except credentials, verified - INACTIVE
      {
        name: "Full Mod",
        email: "full.mod@example.com",
        role: "moderator",
        image: "https://example.com/full-mod.jpg",
        providers: ["google", "github", "facebook"],
        providerIds: new Map([
          ["google", "google_user_id_2222"],
          ["github", "github_user_id_3333"],
          ["facebook", "fb_user_id_4444"],
        ]),
        emailVerified: true,
        status: "inactive",
        lastLogin: new Date("2025-12-03T11:45:00Z"),
      },
    ];

    const users = await User.insertMany(usersData);
    console.log(`${users.length} users seeded successfully!`);

    // Log the created users (without passwords)
    users.forEach((user) => {
      const { password, ...safeUser } = user.toObject();
      console.log(safeUser);
    });
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

// Run the seeder
export default seedUsers;