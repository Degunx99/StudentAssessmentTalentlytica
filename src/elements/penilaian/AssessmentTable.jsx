import React, { useState } from 'react';
import Select from 'react-select';
import './AssessmentTable.scss';

const AssessmentTable = () => {
  const mahasiswa = Array.from({ length: 10 }, (_, i) => `Mahasiswa ${i + 1}`);
  const headerPenilaian = ['Aspek Penilaian 1', 'Aspek Penilaian 2', 'Aspek Penilaian 3', 'Aspek Penilaian 4'];

  const options = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString(),
  }));

  const [ratings, setRatings] = useState(
    headerPenilaian.reduce((acc, aspect) => {
      acc[aspect] = mahasiswa.reduce((studentAcc, student) => {
        studentAcc[student] = null;
        return studentAcc;
      }, {});
      return acc;
    }, {})
  );

  const [displayResults, setDisplayResults] = useState();

  const handleSelectChange = (aspect, student, selectedOption) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [aspect]: {
        ...prevRatings[aspect],
        [student]: selectedOption ? selectedOption.value : null,
      },
    }));
  };

  const handleSave = () => {
    const results = JSON.stringify(ratings, null, 2);
    setDisplayResults(results);
  };

  return (
    <section className='m-2 p-2'>
      <div className='bg-white'>
        <table className="assessment-table">
          <thead>
            <tr>
              <th>Mahasiswa</th>
              {headerPenilaian.map((assessment, index) => (
                <th key={index}>{assessment}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((student, studentIndex) => (
              <tr key={studentIndex}>
                <td>{student}</td>
                {headerPenilaian.map((aspect, aspectIndex) => (
                  <td key={aspectIndex} className="select-container">
                    <Select
                      value={options.find(option => option.value === ratings[aspect][student])}
                      options={options}
                      isClearable
                      placeholder="Pilih"
                      onChange={(selectedOption) => handleSelectChange(aspect, student, selectedOption)}
                      styles={{
                        container: (provided) => ({
                          ...provided,
                          width: '100%',                           
                          minWidth: 0,                         
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                        }),
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSave} className="save-button">Simpan</button>
        {displayResults && (
          <div className="results-display">
            <h3>Hasil Penilaian:</h3>
            <pre>{displayResults}</pre>
          </div>
        )}
      </div>
    </section>
  );
};

export default AssessmentTable;
