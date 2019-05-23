import { AuthModel } from '../models/auth.model';
import { AuthViewModel } from 'src/app/auth/auth.view-model';

export class AuthMapper {
    static mapViewModelToModel(viewModel: AuthViewModel): AuthModel {
        const model: AuthModel = new AuthModel();
        model.email = viewModel.email;
        model.password = viewModel.password;
        return model;
    }
}
