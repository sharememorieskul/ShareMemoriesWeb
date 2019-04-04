import { AuthViewModel } from '../view-models/auth.view-model';
import { AuthModel } from '../models/auth.model';

export class AuthMapper {
    static mapViewModelToModel(viewModel: AuthViewModel): AuthModel {
        const model: AuthModel = new AuthModel();
        model.email = viewModel.email;
        model.password = viewModel.password;
        return model;
    }
}
