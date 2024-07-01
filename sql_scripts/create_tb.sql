
use test_task

drop table if exists tb_Employees
drop table if exists tb_Positions
drop table if exists tb_Departments
drop table if exists tb_Roles
drop table if exists tb_Employee_roles

create table tb_Employees (
id int identity(1,1) primary key,
create_dt datetime,
[full_name] nvarchar(100),
position_id int,
department_id int
)

create table tb_Positions (
id int identity(1,1) primary key,
create_dt datetime,
name nvarchar(100)
)

create table tb_Departments (
id int identity(1,1) primary key,
create_dt datetime,
end_dt datetime,
name nvarchar(100) 
)

create table tb_Roles (
id int identity(1,1) primary key,
create_dt datetime,
name nvarchar(100) 
)

create table tb_Employee_roles (
id int identity(1,1) primary key,
employee_id int,
department_id int,
role_id int
)


insert into tb_Departments values 
(getdate(), '2999-12-31', 'HR'),
(getdate(), '2999-12-31', 'Development'),
(getdate(), '2999-12-31', 'Risk management')

insert into tb_Positions values 
(getdate(), 'middle QA'),
(getdate(), 'junior Dev SQL'),
(getdate(), 'senior .Net Dev'),
(getdate(), 'senior DWH Dev'),
(getdate(), 'HR manager'),
(getdate(), 'Head of Risk'),
(getdate(), 'PM')

insert into tb_Employees values 
(getdate(), 'Ivanov II', 1, 2),
(getdate(), 'Petrov AA', 2, 2),
(getdate(), 'Sidorov CC', 3, 2),
(getdate(), 'Ivanov ZZ', 4, 2),
(getdate(), 'Petrova YY', 5, 1),
(getdate(), 'Sidorov PP', 6, 3),
(getdate(), 'Ivanova WW', 7, 2)

insert into tb_Roles values 
(getdate(), 'Admin'),
(getdate(), 'Manager'),
(getdate(), 'Operator'),
(getdate(), 'Viewer')