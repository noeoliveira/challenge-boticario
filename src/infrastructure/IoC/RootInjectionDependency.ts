import { container } from "tsyringe";
import { applicationRegistration } from "./Application/ApplicationInjection";
import { repositoryRegistration } from "./Repository/RepositoryInjection";

repositoryRegistration(container);
applicationRegistration(container);
