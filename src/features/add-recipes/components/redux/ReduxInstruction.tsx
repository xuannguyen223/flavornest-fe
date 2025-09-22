import { useAppDispatch } from '@/store/hooks';
import { updateStep } from '@/store/features/recipeSlice';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/common/FormInput';
import type { Instruction } from '@/types/TypeRecipe';

type ReduxInstructionStepProps = {
	step: Instruction;
	stepNumber: number;
	onRemove: () => void;
	dragHandleProps?: any;
};

export function ReduxInstruction({
	step,
	stepNumber,
	onRemove,
	dragHandleProps,
}: ReduxInstructionStepProps) {
	const dispatch = useAppDispatch();

	// Add null check to prevent errors
	if (!step) {
		return null;
	}

	const handleTextChange = (value: string) => {
		dispatch(updateStep({ id: step.id.toString(), text: value }));
	};

	return (
		<div className="flex gap-2 sm:gap-3 p-2 min-w-0">
			<div
				{...dragHandleProps}
				className="cursor-grab flex-shrink-0 flex items-center">
				<img src="public/re-order icon.svg" />
			</div>

			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 sm:gap-3 mb-2">
					<span className="font-medium text-sm sm:text-base lg:text-lg xl:text-xl text-(--primary-color) flex-shrink-0">
						Step {stepNumber}
					</span>
				</div>
				<FormInput
					as="textarea"
					value={step.description || ''}
					onChange={handleTextChange}
					placeholder="Describe this step in detail..."
					inputClassName="w-full h-24 sm:h-28 lg:h-32 xl:h-[140px] placeholder:text-(--light-gray-color) text-(--primary-color) text-xs sm:text-sm lg:text-base xl:text-lg border-1 border-solid border-(--border-color) rounded-[10px]"
					rows={4}
				/>
			</div>

			<div className="flex items-center min-w-0">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={onRemove}
					className="p-0 flex-shrink-0">
					<img
						src="public/remove-icon.svg"
						alt="Remove instruction step"
					/>
				</Button>
			</div>
		</div>
	);
}
