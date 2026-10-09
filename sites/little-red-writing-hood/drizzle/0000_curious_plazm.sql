CREATE TABLE `early_access_signups` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`email` text NOT NULL,
	`age_range` text NOT NULL,
	`country` text NOT NULL,
	`interest` text NOT NULL,
	`stationery_products` text DEFAULT '[]' NOT NULL,
	`pen_pal_motivation` text,
	`consent_version` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `early_access_signups_email_unique` ON `early_access_signups` (`email`);