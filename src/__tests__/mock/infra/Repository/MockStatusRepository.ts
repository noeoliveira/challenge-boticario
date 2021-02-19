import { IStatusRepository, IStatus } from "../../../../domain/Interfaces";
import { StatusEntity } from "../../../../infrastructure/database/entity/StatusEntity";

export class MockStatusRepository implements IStatusRepository {
  private repository: StatusEntity[] = [
    {
      id: 1,
      description: "Em validação",
      created_at: "2021-02-13 19:33:18",
      updated_at: "2021-02-13 19:33:18",
    },
    {
      id: 2,
      description: "Aprovado",
      created_at: "2021-02-13 19:33:18",
      updated_at: "2021-02-13 19:33:18",
    },
  ];

  async findById(id: string): Promise<IStatus | undefined> {
    return this.repository.find((item) => item.id === Number(id));
  }
}
