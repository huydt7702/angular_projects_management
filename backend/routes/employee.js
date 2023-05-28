const router = require("express").Router();
const Employee = require("../models/employee");
const bcrypt = require("bcryptjs");
const config = require("../config");

router.post("/", async (req, res, next) => {
    let employee = new Employee();

    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.password = bcrypt.hashSync(req.body.password);
    employee.zone = req.body.zone;
    employee.role = req.body.role;
    employee.phone = req.body.phone;
    employee.image = employee.gravatar();
    employee.status = req.body.status;

    try {
        employee = await employee.save();

        if (!employee) {
            return res.status(500).json({
                success: false,
                message: "The employee cannot be created",
            });
        }

        res.json({
            success: true,
            employee: employee,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "The employee cannot be created",
            error: error,
        });
    }
});

router.get("/", async (req, res, next) => {
    const employeeList = await Employee.find().select("-password");

    if (!employeeList) {
        return res.status(500).json({
            success: false,
            message: "No employee existed",
        });
    }

    res.json({
        success: true,
        employees: employeeList,
    });
});

router.get("/:id", async (req, res, next) => {
    const employee = await Employee.findById(req.params.id).select("-password");

    if (!employee) {
        return res.status(500).json({
            success: false,
            message: "No employee existed",
        });
    }

    res.json({
        success: true,
        employee: employee,
    });
});

router.put("/:id", async (req, res, next) => {
    const employeeExist = await Employee.findById(req.params.id);

    if (!employeeExist) {
        return res.status(500).json({
            success: false,
            message: "No employee existed",
        });
    }

    let newPassword = req.body.password ? bcrypt.hashSync(req.body.password) : employeeExist.password;

    let employee = {
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
        zone: req.body.zone,
        role: req.body.role,
        phone: req.body.phone,
        status: req.body.status,
    };
    try {
        const emp = await Employee.findByIdAndUpdate(req.params.id, employee, { new: true });

        if (!emp) {
            return res.status(500).json({
                success: false,
                message: "The employee cannot be updated",
            });
        }

        res.json({
            success: true,
            employee: emp,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "The employee cannot be updated",
            error: error,
        });
    }
});

module.exports = router;
