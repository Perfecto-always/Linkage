import Modal from "../../components/Modal";
import Create from "./Create";
import Join from "./Join";

interface ModalFormProps {
  trigger?: boolean;
  setTrigger: (args: boolean) => void;
  isNew?: boolean;
}

function ModalForm({ trigger, setTrigger, isNew }: ModalFormProps) {
  if (!trigger) return null;

  return (
    <Modal close={setTrigger} open={trigger}>
      <form
        method='POST'
        className='flex flex-col rounded-xl justify-center space-y-3 w-64'
      >
        {isNew ? (
          <Create setTrigger={setTrigger} />
        ) : (
          <Join setTrigger={setTrigger} />
        )}
      </form>
    </Modal>
  );
}

export default ModalForm;
export type { ModalFormProps };
