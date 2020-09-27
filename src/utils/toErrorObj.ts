import { type } from "os";
import { FieldError } from "../generated/graphql";

type errorObj = {
	[key: string]: string;
};

const toErrorObj = (errors: Array<FieldError>): errorObj => {
	let errObj: errorObj = {};
	errors.forEach((fieldError) => {
		errObj[fieldError.field] = fieldError.message;
	});
	return errObj;
};
export default toErrorObj;
