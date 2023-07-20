import { useResetRecoilState } from 'recoil';
import { profileState, uploadedProfileState } from '~/Home/store';
import { authEmailState, authPasswordState, authenticatedUserState, firebaseAuthState } from '../store';
import { workExperienceShortViewState } from '~/CV/store';

const useUserReset = () => {
  const resetProfile = useResetRecoilState(profileState)
  const resetUploadedProfile = useResetRecoilState(uploadedProfileState)
  const resetAuthEmail = useResetRecoilState(authEmailState)
  const resetFirebaseAuth = useResetRecoilState(firebaseAuthState)
  const resetAuthPassword = useResetRecoilState(authPasswordState)
  const resetAuthenticatedUser = useResetRecoilState(authenticatedUserState)
  const resetWorkExperienceShortView = useResetRecoilState(workExperienceShortViewState)

  const reset = () => {
    resetProfile();
    resetUploadedProfile();
    resetAuthEmail();
    resetFirebaseAuth();
    resetAuthPassword();
    resetAuthenticatedUser();
    resetWorkExperienceShortView();
  }

  return reset;
}

export default useUserReset;