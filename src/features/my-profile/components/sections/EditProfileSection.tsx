import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Sections from '@/features/my-profile/components/sections/Sections';
import { FormInput } from '@/components/common/FormInput';
import { PhotoUpload, type PhotoUploadRef } from '../PhotoUpload';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { updateUserProfile, type UpdateUserProfileData } from '@/services/user.service';
import { setUserProfile } from '@/store/features/user/userSlice';

function EditProfileSection() {
	const dispatch = useAppDispatch();
	const userProfile = useAppSelector(state => state.userSlice.profile);
	const [fullName, setFullName] = useState(userProfile.name || '');
	const [website, setWebsite] = useState(() => {
		// Load website from localStorage on component mount
		if (typeof window !== 'undefined') {
			return localStorage.getItem('userWebsite') || '';
		}
		return '';
	});
	const [aboutMe, setAboutMe] = useState(userProfile.bio || '');
	const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
	const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const profilePhotoUploaderRef = useRef<PhotoUploadRef>(null);
	const canSubmit = fullName.trim().length > 0;

	useEffect(() => {
		setFullName(userProfile.name || '');
		setAboutMe(userProfile.bio || '');
	}, [userProfile]);

	const handleWebsiteChange = (value: string) => {
		setWebsite(value);
		if (typeof window !== 'undefined') {
			localStorage.setItem('userWebsite', value);
		}
	};

	const handleImageUploaded = (imageUrl: string) => {
		setProfilePhotoUrl(imageUrl);
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsSubmitting(true);
		try {
			// Upload image to CDN first if photo exists
			let uploadedImageUrl = profilePhotoUrl;
			if (profilePhoto && profilePhotoUploaderRef.current) {
				try {
					uploadedImageUrl = await profilePhotoUploaderRef.current.uploadImage();
				} catch (uploadError) {
					console.error('Failed to upload profile image:', uploadError);
					return;
				}
			}

			const profileData: UpdateUserProfileData = {
				name: fullName.trim(),
				bio: aboutMe.trim() || undefined,
				...(uploadedImageUrl && { avatarUrl: uploadedImageUrl }),
			};

			// Call API to update profile
			const result = await updateUserProfile(userProfile.userId, profileData);
			console.log('Profile updated successfully:', result);

			dispatch(
				setUserProfile({
					...userProfile,
					name: fullName.trim(),
					bio: aboutMe.trim() || null,
					avatarUrl: uploadedImageUrl || userProfile.avatarUrl,
				}),
			);
		} catch (error) {
			console.error('Error updating profile:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Sections title="Edit Your Profile">
			<form
				onSubmit={handleFormSubmit}
				className="min-h-screen flex flex-row justify-between pl-10 gap-30 mb-4">
				<section className="w-[15%]">
					<PhotoUpload
						ref={profilePhotoUploaderRef}
						value={profilePhoto}
						onChange={setProfilePhoto}
						onImageUploaded={handleImageUploaded}
						avatarUrl={userProfile.avatarUrl}
					/>
				</section>

				<section className="w-[80%] space-y-4">
					<FormInput
						as="input"
						label="Full Name"
						value={fullName}
						onChange={setFullName}
						placeholder="Enter your full name"
						className="space-y-2"
					/>
					<FormInput
						as="input"
						label="Website"
						value={website}
						onChange={handleWebsiteChange}
						placeholder="https://"
						className="space-y-2"
					/>
					<FormInput
						as="textarea"
						label="About Me"
						value={aboutMe}
						onChange={setAboutMe}
						placeholder="Tell us about yourself"
						rows={5}
						className="space-y-2"
					/>
					<div className="text-right">
						<Button
							type="submit"
							disabled={isSubmitting || !canSubmit}
							className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 xl:h-[56px] font-medium text-base sm:text-lg lg:text-xl xl:text-[24px] text-white px-4 
								sm:px-5 py-3 sm:py-4 lg:py-5 xl:py-6 bg-(--primary-color) rounded-full">
							Update Profile
						</Button>
					</div>
				</section>
			</form>
		</Sections>
	);
}

export default EditProfileSection;
