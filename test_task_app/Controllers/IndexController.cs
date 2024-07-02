using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using System.Data;
using System.Reflection;
using test_task_app.InternalProcesses;
using test_task_app.Models;
using test_task_app.Structures;

namespace test_task_app.Controllers
{
    public class IndexController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetEmployeeRoles()
        {
            cl_Tasks task = new cl_Tasks();
            string query = "select * from test_task.dbo.tb_Employee_roles";
            var employees = task.GetData(query);

            return Json(JsonConvert.SerializeObject(employees, Formatting.None,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }));
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            cl_Tasks task = new cl_Tasks();
            string query = "select * from test_task.dbo.tb_Employees";
            var employees = task.GetData(query);

            return Json(JsonConvert.SerializeObject(employees, Formatting.None,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }));
        }

        [HttpGet]
        public IActionResult GetDepartments()
        {
            cl_Tasks task = new cl_Tasks();
            string query = "select * from test_task.dbo.tb_Departments";
            var departments = task.GetData(query);

            return Json(JsonConvert.SerializeObject(departments, Formatting.None,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }));
        }

        [HttpGet]
        public IActionResult GetRoles()
        {
            cl_Tasks task = new cl_Tasks();
            string query = "select * from test_task.dbo.tb_Roles";
            var roles = task.GetData(query);

            return Json(JsonConvert.SerializeObject(roles, Formatting.None,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }));
        }

        [HttpPost]
        public IActionResult PostRole([FromBody] st_Role_data data)
        {
            DataTable table = new DataTable();
            DataColumn employee_id = new DataColumn();
            employee_id.ColumnName = "employee_id";
            employee_id.DataType = typeof(int);

            DataColumn department_id = new DataColumn();
            department_id.ColumnName = "department_id";
            department_id.DataType = typeof(int);

            DataColumn role_id = new DataColumn();
            role_id.ColumnName = "role_id";
            role_id.DataType = typeof(int);

            table.Columns.Add(employee_id);
            table.Columns.Add(department_id);
            table.Columns.Add(role_id);

            DataRow row = table.NewRow();
            row[0] = data.employee_id; row[1] = data.department_id; row[2] = data.role_id;

            table.Rows.Add(row);

            try
            {
                cl_Tasks tasks = new cl_Tasks("exec test_task.dbo.sp_Employee_roles @Employee_roles = ", table);

                return Json(new { message = "success" });
            }
            catch
            {
                return Json(new { message = "error" });
            }
        }
    }
}