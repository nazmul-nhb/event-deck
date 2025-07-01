import {
	extractUpdatedFields,
	isCustomFile,
	isCustomFileArray,
	isEmptyObject,
	isFileArray,
	isFileList,
	isFileUpload,
	isOriginFileObj,
	pickFields,
} from 'nhb-toolbox';
import type { GenericObject } from 'nhb-toolbox/object/types';
import { toast } from 'sonner';

interface UpdateOptions<T extends GenericObject> {
	fileFields?: (keyof T)[];
}

export function useValidateUpdate() {
	function validateUpdate<T extends GenericObject, U extends Partial<T>>(
		prevData: T,
		newData: U,
		options?: UpdateOptions<U>
	) {
		const { fileFields = [] } = options ?? {};

		// ! Get all keys from newData that aren't fileFields
		const allKeys = Object.keys(newData) as (keyof U)[];
		const normalFields = allKeys.filter((key) => !fileFields.includes(key));

		let withoutFile = newData;

		if (normalFields?.length > 0) {
			withoutFile = pickFields(newData, normalFields);
		}

		const updated = extractUpdatedFields(prevData, withoutFile) as U;

		if (fileFields?.length > 0) {
			fileFields?.forEach((field) => {
				if (
					isCustomFileArray(newData[field]) ||
					isFileArray(newData[field]) ||
					isCustomFile(newData[field]) ||
					isOriginFileObj(newData[field]) ||
					isFileUpload(newData[field]) ||
					isFileList(newData[field]) ||
					(newData[field] as unknown) instanceof File
				) {
					updated[field] = newData[field];
				}
			});
		}

		if (isEmptyObject(updated)) {
			toast.warning('Nothing to Update!');
			return;
		}

		return updated;
	}

	return { validateUpdate };
}
