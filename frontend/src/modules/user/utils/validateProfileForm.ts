import type { UserProfile } from "../domain/models";

//Utility function used in tests
export const validateProfileForm = (formData: Partial<UserProfile>) => {
        const errors: Record<string, string> = {};
        
        if (!formData.username?.trim()) {
            errors.username = "Le nom d'utilisateur est requis";
        }
        
        if (!formData.email?.trim()) {
            errors.email = "L'email est requis";
        }

        const isFormValid = !!(
            formData.username?.trim() && 
            formData.email?.trim()
        );

        return { errors, isFormValid };
    };
