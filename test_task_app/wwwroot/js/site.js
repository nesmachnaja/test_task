
function GetData(event) {
    GetEmployees();
    GetDepartments();
    GetRoles();
}

function GetEmployees() {

    $.ajax({
        url: "/Index/GetEmployees",
        type: "GET",
        dataType: "json",
        success: function (response) {
            var employees = JSON.parse(response);
            response = null;

            var select_employees = document.createElement("select");
            select_employees.id = "select_employees";
            select_employees.onchange = FixRole;

            for (var employee of employees) {
                var option = document.createElement("option");
                option.value = employee.id;
                option.innerHTML = employee.full_name;
                select_employees.appendChild(option);
            }

            var div = document.getElementsByClassName("inline")[0];

            div.appendChild(select_employees);

        },
        error: function (xhr, status, error) {
        }
    });
}

function GetDepartments() {

    $.ajax({
        url: "/Index/GetDepartments",
        type: "GET",
        dataType: "json",
        success: function (response) {
            var departments = JSON.parse(response);
            response = null;

            var select_departments = document.createElement("select");
            select_departments.id = "select_departments";
            select_departments.onchange = FixRole;

            for (var department of departments) {
                var option = document.createElement("option");
                option.value = department.id;
                option.innerHTML = department.name;
                select_departments.appendChild(option);
            }

            var div = document.getElementsByClassName("inline")[0];

            div.appendChild(select_departments);

        },
        error: function (xhr, status, error) {
        }
    });
}


function GetRoles() {

    $.ajax({
        url: "/Index/GetRoles",
        type: "GET",
        dataType: "json",
        success: function (response) {
            var roles = JSON.parse(response);
            response = null;

            var select_roles = document.createElement("select");
            select_roles.id = "select_roles";
            select_roles.onchange = FixRole;

            for (var role of roles) {
                var option = document.createElement("option");
                option.value = role.id;
                option.innerHTML = role.name;
                select_roles.appendChild(option);
            }

            var div = document.getElementsByClassName("inline")[0];

            div.appendChild(select_roles);

        },
        error: function (xhr, status, error) {
        }
    });
}

function FixRole() {
    var employee = document.getElementById("select_employees");
    var department = document.getElementById("select_departments");
    var role = document.getElementById("select_roles");

    var prev_role = document.getElementById("role");
    if (prev_role !== null)
        prev_role.parentElement.removeChild(prev_role);
        

    if (employee !== null && department !== null && role !== null) {
        var div_role = document.createElement("div");
        div_role.id = "role";
        document.getElementsByClassName("inline")[0].appendChild(div_role);

        var p = document.createElement("p");
        p.display = "inline-block";
        p.innerHTML = employee.selectedOptions[0].innerHTML + " - " + department.selectedOptions[0].innerHTML + " - " + role.selectedOptions[0].innerHTML;
        p.employee_id = employee.selectedOptions[0].value;
        p.department_id = department.selectedOptions[0].value;
        p.role_id = role.selectedOptions[0].value;
        div_role.appendChild(p);

        var button = document.createElement("button");
        button.innerHTML = "OK";
        button.onclick = PostRole;
        button.display = "inline-block";

        div_role.appendChild(button);
    }
} 

function PostRole(event) {
    var div = event.target.closest("div");
    var p = div.getElementsByTagName("p")[0];
    var role_data = {
        employee_id: p.employee_id,
        department_id: p.department_id,
        role_id: p.role_id
    };

    $.ajax({
        type: "POST",
        url: "/Index/PostRole",
        data: JSON.stringify(role_data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.message === "success") {
                var prev_role = document.getElementById("role");
                if (prev_role !== null)
                    prev_role.parentElement.removeChild(prev_role);
            }
        },
        error: function (error) {
            console.error(error);
        }
    });
}