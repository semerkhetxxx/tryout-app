import React from 'react';
import { connect } from 'react-redux';


export const TextInput = field => {
  const { input, meta } = field;
  const classStr = ( meta.error && meta.touched )?"form-control is-invalid":"form-control";
  return <div>
    <input {...input} className={ classStr } />
    {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
  </div>
}

class DropDownSelect extends React.Component { 

  renderSelectOptions = (data) => (
    <option key={data} value={data}>{data}</option>
  )

  render() {
    const { input, meta} = this.props;
    const classStr = ( meta.error && meta.touched )?"custom-select is-invalid":"custom-select";
    return (
      <div>
        <select {...input} className={ classStr } >
          <option value="">請選擇</option>
          {this.props.data.map(this.renderSelectOptions)}
        </select>
        {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
      </div>
    );
  }
};

export const CountySelect = connect( state=>({data: state.aqi.CountySet}) )(DropDownSelect);
export const SiteNameSelect = connect( state=>({data: state.aqi.SiteNameSet}) )(DropDownSelect);
export const StatusSelect = connect( state=>({data: state.aqi.StatusSet}) )(DropDownSelect);
