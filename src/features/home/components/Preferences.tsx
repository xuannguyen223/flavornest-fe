'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PreferenceOption {
	id: string;
	label: string;
	image?: string;
}

export interface PreferenceStep {
	question: string;
	options: PreferenceOption[];
}

interface PreferencesProps {
	steps: PreferenceStep[];
	sectionName?: string;
	description?: string;
	onComplete?: (selections: Record<number, string[]>) => void;
	className?: string;
}

export function Preferences({
	steps,
	sectionName = 'Set Your Preferences',
	description = 'Craft your personalized experience! Set your preferences to tailor content, ensuring a delightful journey that matches your unique tastes and culinary desires.',
	onComplete,
	className,
}: PreferencesProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [selections, setSelections] = useState<Record<number, string[]>>({});

	const handleOptionToggle = (optionId: string) => {
		setSelections(prev => {
			const currentSelections = prev[currentStep] || [];
			const isSelected = currentSelections.includes(optionId);

			return {
				...prev,
				[currentStep]: isSelected
					? currentSelections.filter(id => id !== optionId)
					: [...currentSelections, optionId],
			};
		});
	};

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(prev => prev + 1);
		} else {
			onComplete?.(selections);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(prev => prev - 1);
		}
	};

	const currentStepData = steps[currentStep];
	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === steps.length - 1;
	const currentSelections = selections[currentStep] || [];

	return (
		<div className={cn('w-full mx-auto pb-10', className)}>
			{(sectionName || description) && (
				<div className="w-full mb-4 px-20">
					{sectionName && (
						<div className="text-5xl font-cormorant font-semibold text-gray-900 tracking-tight text-balance mb-4">
							{sectionName}
						</div>
					)}

					{description && (
						<div className="w-full text-left text-gray-600 text-lg leading-relaxed text-pretty">
							{description}
						</div>
					)}
				</div>
			)}

			<div
				className="px-8 py-8 relative"
				style={{
					backgroundImage: `url('/preference.png')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}>
				<div className="absolute inset-0 bg-black/80" />

				<div className="relative z-10">
					<div className="flex justify-center mb-8">
						<div className="flex gap-2">
							{steps.map((_, index) => (
								<div
									key={index}
									className={`w-8 h-1.5 rounded-full ${
										index === currentStep ? 'bg-white' : 'bg-gray-600'
									}`}
								/>
							))}
						</div>
					</div>
					<div className="text-2xl text-white text-center mb-12">{currentStepData.question}</div>
					<div className="flex justify-center gap-6 mb-12 flex-wrap">
						{currentStepData.options.map(option => {
							const isSelected = currentSelections.includes(option.id);

							return (
								<div
									key={option.id}
									onClick={() => handleOptionToggle(option.id)}
									className={`relative w-24 h-24 rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform ${
										isSelected ? 'ring-4 ring-white' : ''
									}`}>
									<img
										src={option.image ? option.image : '/placeholder.svg'}
										alt={option.label}
										className="w-full h-full object-cover"
									/>
									<div
										className={`absolute inset-0 flex items-center justify-center ${
											isSelected ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-40'
										}`}>
										<span className="text-white text-sm font-medium text-center px-1">
											{option.label}
										</span>
									</div>
								</div>
							);
						})}
					</div>
					<div className="flex justify-center gap-4">
						{!isFirstStep && (
							<Button
								onClick={handleBack}
								variant="outline"
								className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900 px-8 py-2 rounded-full cursor-pointer">
								Back
							</Button>
						)}

						<Button
							onClick={handleNext}
							className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-2 rounded-full cursor-pointer">
							{isLastStep ? 'Finish' : 'Next'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
