//* components
import LoginCon from '@/components/pages/login/login-con';
import FormPageBg from '@/components/ui-kits/form-page-bg';

const Page = () => {
    return (
        <div className='form-page'>
            <FormPageBg />
            <LoginCon />
        </div>
    );
};

export default Page;
