import Modal from "./Modal";
import ChaiArt from "./ChaiArt";
const ChaiInfoModal = ({ info, onClose }) => {
  if (!info) return null;
  return (
    <Modal titleId="chai-info-title" onClose={onClose}>
      <ChaiArt className="modal-cup" small />
      <span className="eyebrow">YOUR RECENT CHAI MOMENT</span>
      <h2 id="chai-info-title">{info.name}</h2>
      <dl className="chai-details">
        <div>
          <dt>Time since</dt>
          <dd>{info.timeSince}</dd>
        </div>
        <div>
          <dt>Cost</dt>
          <dd>₹{info.cost}</dd>
        </div>
        <div>
          <dt>Caffeine left</dt>
          <dd>
            {info.remaining}mg <span>/ {info.original}mg</span>
          </dd>
        </div>
      </dl>
    </Modal>
  );
};
export default ChaiInfoModal;
