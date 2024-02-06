import { useEffect, useState } from 'react';
import { sortOpt, statusOpt, typeOpt } from '../constants';
import { useDispatch } from 'react-redux';
import { clearFilters, filterBySearch, sortJobs } from '../redux/slices/jobSlice';

const Filter = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // Bir sayaç başlat ve işlemi sayaç durduğunda yap
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: 'position', text }));
    }, 500);

    // Eğer süre bitmeden tekrar useEffect çalışırsa önceki sayacı sıfırla
    return () => clearTimeout(timer);
  }, [text, dispatch]);

  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div>
          <label>Şirket ismine göre ara:</label>
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
          />
        </div>

        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({
                  field: 'status',
                  text: e.target.value,
                })
              )
            }
            name="status"
          >
            <option value={''} hidden>
              Seçiniz
            </option>
            {statusOpt.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({
                  field: 'type',
                  text: e.target.value,
                })
              )
            }
            name="type"
          >
            <option value={''} hidden>
              Seçiniz
            </option>
            {typeOpt.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala</label>
          <select
            onChange={(e) => dispatch(sortJobs(e.target.value))}
            name="type"
          >
            <option value={''} hidden>
              Seçiniz
            </option>
            {sortOpt.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => dispatch(clearFilters())}
            type="reset"
            className="cta"
          >
            <span>İŞ EKLE</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
