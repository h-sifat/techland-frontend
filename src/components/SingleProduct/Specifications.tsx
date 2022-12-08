import { ProductPublicInterface } from "../../interfaces/product";

export interface Specifications_Argument {
  product: ProductPublicInterface;
}
export function Specifications(arg: Specifications_Argument) {
  const specifications = arg.product.specifications;

  return (
    <>
      <h3 className="fs-6">Specifications</h3>

      {Object.entries(specifications).map(([groupName, descriptionObject]) => (
        <table key={groupName} className="table table-hover">
          <thead className="table-dark">
            <tr>
              <td>{groupName}</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {Object.entries(descriptionObject).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </>
  );
}
