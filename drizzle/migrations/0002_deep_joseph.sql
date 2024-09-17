ALTER TABLE `members` MODIFY COLUMN `phone` bigint;--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `borrowDate` varchar(10);--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `dueDate` varchar(15);--> statement-breakpoint
ALTER TABLE `members` ADD `image` varchar(500);