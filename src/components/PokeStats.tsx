import '../App.css';

interface IPokeStatsProps {
    key: any;
    statValue: number;
    statName: string;
    effort: number;
}

export default function PokeStats(props: IPokeStatsProps) {

    return (
        <div className={"stat-window"}>
            <div className={'stat-name'}>Stat: {props.statName}</div>
            <div className={'stat-value'}>Value: {props.statValue}</div>
            <div className={'stat-value'}>Effort: {props.effort}</div>
        </div>
    )
}