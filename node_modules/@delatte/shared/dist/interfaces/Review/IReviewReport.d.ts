import { Types } from "mongoose";
export interface IReviewReport {
    userId: Types.ObjectId;
    motivo: string;
    fecha: Date;
}
export interface IReviewReports {
    reportes?: IReviewReport[];
}
//# sourceMappingURL=IReviewReport.d.ts.map