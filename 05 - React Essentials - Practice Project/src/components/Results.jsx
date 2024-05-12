import { calculateInvestmentResults, formatter } from '../util/investment.js';

export default function Results({ userInput }) {
    const resultsData = calculateInvestmentResults(userInput);
    const initialInvestment = 
        resultsData[0].valueEndOfYear - 
        resultsData[0].interest - 
        resultsData[0].annualInvestment;
    return (
        <table id='result'>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Annual Interest</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>

            <tbody>
                {
                    resultsData.map(row => {
                        const totalInterest = row.valueEndOfYear - row.annualInvestment * row.year - initialInvestment;
                        const totalInvested = row.valueEndOfYear - totalInterest;
                        return (
                            <tr key={row.year}>
                                <td>{row.year}</td>
                                <td>{formatter.format(row.valueEndOfYear)}</td>
                                <td>{formatter.format(row.interest)}</td>
                                <td>{formatter.format(totalInterest)}</td>
                                <td>{formatter.format(totalInvested)}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}
