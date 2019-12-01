import React from 'react';
import { SignUp } from 'aws-amplify-react';

class CustomSignUp extends SignUp {
    showComponent() {
        return (
            <form>
                <div
                    className="input-group"
                >
                    <input
                        id="name"
                        name="name"
                    />
                    <label
                        htmlFor="name"
                    >
                        Name
                    </label>
                </div>
            </form>
        )
    }
}

export default CustomSignUp;