USE test_task
GO
/****** Object:  StoredProcedure [dbo].[sp_KZ_SNAP_raw]    Script Date: 20.01.2023 17:34:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[sp_Employee_roles]
    @Employee_roles [tp_Employee_roles] readonly
AS
BEGIN
    insert into [dbo].tb_Employee_roles select * from @Employee_roles
END