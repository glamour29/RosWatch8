USE [watchshop]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_detail](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[create_date] [date] NULL,
	[quantity] [int] NOT NULL,
	[update_date] [date] NULL,
	[id_order] [bigint] NULL,
	[id_product] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD  CONSTRAINT [FKe7jb3j9qxkmw9p02g8uxdwbff] FOREIGN KEY([id_product])
REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[order_detail] CHECK CONSTRAINT [FKe7jb3j9qxkmw9p02g8uxdwbff]
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD  CONSTRAINT [FKsta0q8hk1lt2vdu92u4e5vr4a] FOREIGN KEY([id_order])
REFERENCES [dbo].[orders] ([id])
GO
ALTER TABLE [dbo].[order_detail] CHECK CONSTRAINT [FKsta0q8hk1lt2vdu92u4e5vr4a]
GO
