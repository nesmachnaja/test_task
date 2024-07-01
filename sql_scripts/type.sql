USE [test_task]
GO

/****** Object:  Table [dbo].[tb_Employee_roles]    Script Date: 01.07.2024 11:42:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE type [dbo].[tp_Employee_roles] as TABLE (
	[employee_id] [int] NULL,
	[department_id] [int] NULL,
	[role_id] [int] NULL
)


