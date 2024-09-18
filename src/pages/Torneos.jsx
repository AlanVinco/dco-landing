import logo from '../assets/dco-removebg-preview.png';

import '../index.css'

const Torneos = () => {
    return (
        <div>
            <div className="hero-content flex-col lg:flex-row card glass">
                <div className='text-white'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className='text-[#06938D] font-bold text-base'>
                                    <th></th>
                                    <th>Posición</th>
                                    <th>Categoria</th>
                                    <th>Torneo</th>
                                    <th>Equipo</th>
                                    <th>Puntos</th>
                                    <th>JJ</th>
                                    <th>JE</th>
                                    <th>GF</th>
                                    <th>GC</th>
                                    <th>GD</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                    <td>Purple</td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>Tax Accountant</td>
                                    <td>Red</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Torneos;
