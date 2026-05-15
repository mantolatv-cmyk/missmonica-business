"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Mock endpoints for the MVP
router.get('/', (req, res) => {
    res.json({ message: 'List of modules' });
});
router.post('/', (req, res) => {
    res.json({ message: 'Module created' });
});
exports.default = router;
//# sourceMappingURL=moduleRoutes.js.map