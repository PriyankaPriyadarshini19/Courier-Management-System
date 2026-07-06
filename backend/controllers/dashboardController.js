import { getDashboardStatusData } from "../services/analyticsServices.js";

export const getDashboardStatus = async (req, res, next) => {
    try {
        const data = await getDashboardStatusData();
        const { _meta, ...payload } = data;
        res.status(200).json(payload);
    } catch (error) {
        next(error)
    }
}