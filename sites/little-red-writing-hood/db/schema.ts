import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const signups = sqliteTable("early_access_signups", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  ageRange: text("age_range").notNull(),
  country: text("country").notNull(),
  interest: text("interest", {enum:["stationery","pen_pal","both"]}).notNull(),
  stationeryProducts: text("stationery_products", {mode:"json"}).notNull().default([]),
  penPalMotivation: text("pen_pal_motivation"),
  consentVersion: text("consent_version").notNull(),
  welcomeStatus: text("welcome_status").notNull().default("pending"),
  notificationStatus: text("notification_status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
